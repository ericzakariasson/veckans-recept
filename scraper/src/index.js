require('dotenv').config();
const { URL, URLSearchParams } = require('url');

const puppeteer = require('puppeteer');

const { extractRecipe } = require('./extractRecipe');
const { UNITS } = require('./constants');

const { models, sequelize } = require('./db');
const { convertMS, asyncForEach } = require('./helpers');

const isProduction = process.env.NODE_ENV === 'production';

// https://www.ica.se/templates/ajaxresponse.aspx?id=12&ajaxFunction=RecipeListMdsa&start=1000&num=16&filter=Måltid:Middag

const baseUrl = ({ pageNum, batchSize }) => {
  const date = new Date();

  const url = new URL('https://www.ica.se/templates/ajaxresponse.aspx');

  const params = new URLSearchParams({
    id: 12,
    ajaxFunction: 'RecipeListMdsa',
    start: pageNum * batchSize,
    num: batchSize,
    filter: 'Måltid::Middag',
    _hour: date.getHours(),
    t: Date.now()
  });

  url.search = params;

  return url.href;
};

const extractUrls = () => Array.from(document.querySelectorAll('article.recipe')).map(recipe => recipe.querySelector('h2 a').href);

const decreaseBatchSize = batchSize => (batchSize /= 2);
const increasePageNumber = pageNum => (pageNum += 1);

const shouldStop = ({ pageNum, batchSize }) => batchSize <= 1 || (batchSize <= 1 && pageNum !== 0);

const initialParams = {
  pageNum: 0,
  batchSize: isProduction ? process.env.BATCH_SIZE : 8
};

const scrape = async (params = initialParams) => {
  const { batchSize, pageNum } = params;

  const units = await models.Unit.findAll({ raw: true });

  const browser = await puppeteer.launch({
    // executablePath: '/usr/bin/chromium-browser', // Docker alpine
    args: ['--no-sandbox', '--disable-dev-shm-usage'] // https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md
  });

  const page = await browser.newPage();

  const url = baseUrl(params);

  await page.goto(url);

  await page.waitForSelector('.recipe', { timeout: 4000 }).catch(err => {
    if (shouldStop(params)) {
      console.log('No more urls, exiting');
      process.exit(1);
    }

    const newBatchSize = decreaseBatchSize(batchSize);
    console.log('Batch size set to', newBatchSize);
    return scrape({ pageNum, batchSize: newBatchSize });
  });

  const recipeUrls = await page.evaluate(extractUrls);
  await page.close();

  console.log(`Found ${recipeUrls.length} recipe urls`);

  await asyncForEach(recipeUrls, async recipeUrl => {
    const recipePage = await browser.newPage();
    await recipePage.goto(recipeUrl);
    const content = await recipePage.content();
    const data = await extractRecipe(content, units);
    await recipePage.close();
    await models.Recipe.insert(data, recipeUrl).catch(console.error);
  });

  await browser.close();
  // console.log(JSON.stringify(recipes, null, 4));

  const newPageNum = increasePageNumber(pageNum);
  await scrape({ pageNum: newPageNum, batchSize });
};

const start = Date.now();

sequelize
  .sync()
  .then(async () => {
    console.log(`Database connection to ${process.env.DB_HOST} established`);
    const unitsExists = (await models.Unit.count()) > 0;

    if (!unitsExists) {
      await models.Unit.bulkCreate(UNITS, { ignoreDuplicates: true });
    }

    console.log('Start scraping');
    await scrape();

    process.exit(0);
  })
  .catch(console.error);

process.on('uncaughtException', () => {
  console.log('Something happened, process will exit');
  process.exit(1);
});

process.on('exit', () => {
  const end = Date.now();
  const { hour, minute, seconds } = convertMS(end - start);
  console.log(`Process will exit, alive ${hour}:${minute}:${seconds}`);
});
