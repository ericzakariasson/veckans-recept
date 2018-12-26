require('dotenv').config();

const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const scrapeRecipe = require('./scrapeRecipe');

const { models, sequelize } = require('./models');

const BATCH_SIZE = 10;
const STOP_AT_PAGE = 10;
const PROVIDER = 'ICA';

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function asyncConcat(array, data) {
  return new Promise(resolve => {
    if (Array.isArray(data)) {
      return resolve([...array, ...data]);
    }
    return resolve([...array, data]);
  });
}

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
  return recipe;
};

const numberOfPages = parseInt(STOP_AT_PAGE / BATCH_SIZE, 10);
const pages = [...Array(numberOfPages)].map((_, i) => i + 1);

(async () => {
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
})();

// sequelize.sync().then(() => {
//   console.log(`Database connection to ${process.env.DB_HOST} established`);
// });
