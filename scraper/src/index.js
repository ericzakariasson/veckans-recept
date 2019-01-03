require('dotenv').config();
const { URL, URLSearchParams } = require('url');

const puppeteer = require('puppeteer');

const { extractRecipe } = require('./extractRecipe');
const { UNITS } = require('./constants');

const { models, sequelize } = require('./models');
const { msToTime, asyncForEach } = require('./helpers');

let BATCH_SIZE = 2 ** 13;
let pageNumber = 0;

// https://www.ica.se/templates/ajaxresponse.aspx?id=12&ajaxFunction=RecipeListMdsa&start=1000&num=16&filter=Måltid:Middag

const baseUrl = page => {
  const date = new Date();

  const url = new URL('https://www.ica.se/templates/ajaxresponse.aspx');

  const params = new URLSearchParams({
    id: 12,
    ajaxFunction: 'RecipeListMdsa',
    start: page * BATCH_SIZE,
    num: BATCH_SIZE,
    filter: 'Måltid::Middag',
    _hour: date.getHours(),
    t: Date.now()
  });

  url.search = params;

  return url.href;
};

const extractUrls = () => Array.from(document.querySelectorAll('article.recipe')).map(recipe => recipe.querySelector('h2 a').href);

const scrape = async () => {
  const units = await models.Unit.findAll({ raw: true });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = baseUrl(pageNumber);

  await page.goto(url);

  const hasUrls = (await page.$('.recipe')) !== null;

  if (!hasUrls) {
    if (BATCH_SIZE === 1) {
      return;
    }

    BATCH_SIZE /= 2;
    return scrape();
  }

  const recipeUrls = await page.evaluate(extractUrls);
  await page.close();

  console.log(`Scraped ${recipeUrls.length} recipe urls`);

  await asyncForEach(recipeUrls, async recipeUrl => {
    const recipePage = await browser.newPage();
    await recipePage.goto(recipeUrl);
    const content = await recipePage.content();
    const recipe = await extractRecipe(content, units);
    await recipePage.close();
    await models.Recipe.insert(recipe).catch(err => console.error(err));
  });

  await browser.close();
  // console.log(JSON.stringify(recipes, null, 4));

  pageNumber += 1;
  await scrape();
};

sequelize
  .sync({ force: true })
  .then(async () => {
    console.log(`Database connection to ${process.env.DB_HOST} established`);
    await models.Unit.bulkCreate(UNITS);

    console.log('Start scraping');
    const start = Date.now();
    await scrape();
    const end = Date.now();

    console.log(`Scraping done, took ${msToTime(end - start)}`);
  })
  .catch(err => console.error(err));

process.on('uncaughtException', () => {
  console.log('Something happened, process will exit');
  process.exit(1);
});
