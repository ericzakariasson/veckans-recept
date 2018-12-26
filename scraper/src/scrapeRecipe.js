const cheerio = require('cheerio');
const { calculateScore, decimalToFraction } = require('./helpers');

const YEAR = 'år';

const metaTagsExists = ($, value, key) => $(`meta[${key}="${value}"]`).length > 0;

const scrapeMetaTag = ($, value, key = 'name') => {
  if (metaTagsExists($, value, key)) {
    return $(`meta[${key}="${value}"]`)
      .attr('content')
      .trim();
  }

  return undefined;
};

const scrapePortions = $ => parseInt($('div.servings-picker').attr('data-current-portions'), 10);

const scrapeTags = $ => {
  const tags = [];
  $('.related-recipe-tags__container')
    .find('a')
    .each(function _() {
      const tag = $(this)
        .text()
        .trim();
      tags.push(tag);
    });

  return tags;
};

const scrapeIngredients = $ => {
  const ingredients = [];
  $('li.ingredients__list__item').each(function _() {
    if ($(this).find('span.ingredient').length) {
      const ingredient = $(this).find('span.ingredient');
      const amount = parseFloat(ingredient.attr('data-amount'));
      const unit = ingredient.attr('data-type');

      const amountString = decimalToFraction(amount).display;

      const item = ingredient
        .text()
        .trim()
        .replace(amountString, '')
        .replace(unit, '');

      ingredients.push({ amount, unit, item, raw: ingredient.text().trim() });
    }

    const ingredient = $(this)
      .text()
      .trim();

    const amount = parseFloat(
      $(this)
        .find('span')
        .text()
    );

    const amountString = decimalToFraction(amount).display;

    const ingredientTextParts = ingredient
      .replace(amountString, '')
      .trim()
      .split(' ');

    const unit = ingredientTextParts.length >= 3 ? ingredientTextParts[0] : '';

    const item = ingredientTextParts.filter(word => word !== unit).join(' ');

    ingredients.push({ amount, unit, item, raw: ingredient });
  });

  return ingredients;
};

const scrapeInstructions = $ => {
  const instructions = {};
  $('div.cooking-step').each(function _(i) {
    const step = i;
    const instruction = $(this)
      .find('.cooking-step__content__instruction')
      .text()
      .trim();

    instructions[step] = instruction;
  });
  return instructions;
};

const scrapeRecipe = (html, provider) => {
  const $ = cheerio.load(html);
  const metaTag = (value, key = 'name') => scrapeMetaTag($, value, key);

  const title = metaTag('title');
  const description = metaTag('description');
  const providerId = metaTag('Id');
  const difficulty = metaTag('Svårighetsgrad');
  const time = metaTag('Tillagningstid');
  const portions = scrapePortions($);
  const ingredients = scrapeIngredients($);
  const ingredientNames = metaTag('ingredients').split(',');
  const numberOfIngredients = ingredients.length;
  const instructions = scrapeInstructions($);
  const tags = scrapeTags($);

  const published = metaTagsExists($, 'Publicerad')
    ? metaTag('Publicerad')
        .split(' ')
        .find(word => word.startsWith(YEAR))
        .substring(YEAR.length)
    : undefined;

  const type = metaTag('Typ av recept');

  const image = {
    url: metaTag('ImageUrl', 'property')
  };

  const votes = parseInt(metaTag('NumberOfVotes'), 10);
  const averageScore = parseFloat(metaTag('AverageRating').replace(',', '.'));

  const calculatedScore = calculateScore(votes, averageScore);

  const score = {
    score: calculatedScore,
    averageScore,
    votes
  };

  const recipe = {
    providerId,
    provider,
    title,
    description,
    difficulty,
    time,
    portions,
    ingredients,
    ingredientNames,
    numberOfIngredients,
    instructions,
    tags,
    type,
    published,
    image,
    score
  };

  console.log('Scraped recipe', recipe.title);
  return recipe;
};

module.exports = scrapeRecipe;
