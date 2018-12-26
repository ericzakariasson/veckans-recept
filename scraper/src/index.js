const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const scrapeRecipe = require('./scrapeRecipe');

const BATCH_SIZE = 1;

// const url2 = `https://www.ica.se/templates/ajaxresponse.aspx?id=12&ajaxFunction=RecipeListMdsa&start=1000&num=16&filter=Måltid:Middag`;

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
    t: date.now()
  });

  url.search = params;

  return url;
};

const currentPage = 2;

const scrapeUrls = async page => {
  console.log('Scraping urls');
  const urls = [];
  await page.goto(baseUrl(currentPage));
  await page.waitFor('.recipe');
  const html = await page.content();

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

const scrapeRecipes = async (page, urls) => {
  console.log('Scraping recipes');

  const recipes = [];
  await urls.forEach(async url => {
    await page.goto(url);
    // await page.waitForNavigation({ waitUntil: 'networkidle0' });
    const html = await page.content();
    const recipe = await scrapeRecipe(html);
    recipes.push(recipe);
  });

  return recipes;
};

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const urls = await scrapeUrls(page);
  const recipes = await scrapeRecipes(page, urls);
  console.log(`Scraped ${recipes.length} recipes`);
  // console.log(JSON.stringify(recipes, null, 4));
  await browser.close();
  // await fs.writeFileSync('recipes.json', JSON.stringify(recipes));
})();
