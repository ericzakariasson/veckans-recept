require('dotenv').config();
const { URL, URLSearchParams } = require('url');

const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const { extractRecipe } = require('./extractRecipe');
const { UNITS } = require('./constants');

const { models, sequelize } = require('./models');
const { msToTime, asyncForEach, asyncConcat } = require('./helpers');

const BATCH_SIZE = 1;
const STOP_AT_PAGE = 1;

// const url2 = `https://www.ica.se/templates/ajaxresponse.aspx?id=12&ajaxFunction=RecipeListMdsa&start=1000&num=16&filter=Måltid:Middag`;

const baseUrl = page => {
  const date = new Date();

  const url = new URL('https://www.ica.se/templates/ajaxresponse.aspx');

  const params = new URLSearchParams({
    id: 12,
    ajaxFunction: 'RecipeListMdsa',
    start: page * BATCH_SIZE,
    num: BATCH_SIZE,
    filter: 'Måltid::Middag'
    // _hour: date.getHours()
    // t: Date.now()
  });

  url.search = params;

  return url.href;
};

const scrapeUrls = async (browserPage, page) => {
  console.log('Scraping urls for page', page);
  const urls = [];

  await browserPage.goto(baseUrl(page));
  await browserPage.waitFor('.recipe');
  const html = await browserPage.content();

  const $ = cheerio.load(html);

  const recipeList = $('article.recipe');

  recipeList.each(async function _() {
    const url = $(this)
      .find('h2.title')
      .find('a')
      .attr('href');

    urls.push(url);
  });

  console.log(`Scraped ${urls.length} urls`);
  return urls;
};

const getRecipe = async (page, url) => {
  await page.goto(url);
  // await page.waitForNavigation({ waitUntil: 'networkidle0' });
  const html = await page.content();
  const recipe = await scrapeRecipe(html, PROVIDER);
  const created = await models.Recipe.add(recipe);

  console.log('created', created);

  return recipe;
};

const numberOfPages = parseInt(STOP_AT_PAGE / BATCH_SIZE, 10);
const pages = [...Array(numberOfPages)].map((_, i) => i + 1);

const scrape = async () => {
  let recipes = [];
  let urls = [];
  const browser = await puppeteer.launch();
  const browserPage = await browser.newPage();

  console.log('Scraping urls');
  await asyncForEach(pages, async page => {
    const pageUrls = await scrapeUrls(browserPage, page);
    urls = await asyncConcat(urls, pageUrls);
  });

  console.log('Scraping recipes');
  await asyncForEach(urls, async url => {
    const recipe = await getRecipe(browserPage, url);
    recipes = await asyncConcat(recipes, recipe);
  });

  console.log(`Scraped ${recipes.length} recipes`);
  // console.log(JSON.stringify(recipes, null, 4));
  await browser.close();
  // await fs.writeFileSync('recipes.json', JSON.stringify(recipes));
};

const extractUrls = () => Array.from(document.querySelectorAll('article.recipe')).map(recipe => recipe.querySelector('h2 a').href);

const scrape2 = async () => {
  const units = await models.Unit.findAll({ raw: true });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = baseUrl(0);

  await page.goto(url);
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

  const recipes = await models.Recipe.findAll({
    include: [
      {
        model: models.Ingredient,
        as: 'ingredients',
        include: [models.Unit]
      },
      {
        model: models.Tag,
        as: 'tags'
      }
    ]
  });
  console.log(JSON.stringify(recipes, null, 4));
};

sequelize
  .sync({ force: true })
  .then(async () => {
    console.log(`Database connection to ${process.env.DB_HOST} established`);
    await models.Unit.bulkCreate(UNITS);

    console.log('Start scraping');
    const start = Date.now();
    await scrape2();
    const end = Date.now();

    console.log(`Scraping done, took ${msToTime(end - start)}`);
  })
  .catch(err => console.error(err));
