const cheerio = require('cheerio');
const { toReadableFraction } = require('readable-fractions');
const { calculateScore, decimalToFraction } = require('./helpers');
const { models } = require('./models');
const { PROVIDER } = require('./constants');

const YEAR = 'år';

const AMOUNT_REGEX = /([0-9]+[,.]?[0-9]*)([\d+]?[\/][0-9]+[,.]?[0-9]*)*/g;

const ingredientAmount = text => {
  if (text.trim().length === 0) {
    return {
      amount: 0,
      matches: ['']
    };
  }

  if (typeof text !== 'string') {
    throw Error('Ingredient not text');
  }

  const matches = text.match(AMOUNT_REGEX);

  if (!matches) {
    return {
      amount: 0
    };
  }

  const amounts = matches.map(match => {
    if (match.includes('/')) {
      const [top, bottom] = match.split('/');

      const value = parseFloat(top / bottom);

      return {
        value
      };
    }

    if (match.match(/[,.]/g)) {
      const value = parseFloat(match.replace(',', '.'));
      return {
        value
      };
    }

    return {
      value: parseInt(match, 10)
    };
  });

  const amount = amounts.reduce((total, num) => total + num.value, 0);
  return { amount, matches };
};

const ingredientUnit = (text, units) => {
  const matched = units
    .map(unit => {
      const regex = new RegExp(` ${unit.short} |${unit.name}`, 'gi');

      const match = text.match(regex);
      return { match: match !== null ? match[0] : null, unit };
    })
    .filter(({ match }) => match !== null);

  return matched.length === 0 ? { unit: null, match: null } : matched[0];
};

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

const calcAmountPerPortion = (amount, portions) => Math.round(parseFloat(amount / portions) * 100) / 100;

const scrapeIngredients = ($, portions, units) => {
  const ingredients = [];

  $('li.ingredients__list__item').each(function _() {
    if ($(this).find('span.ingredient').length) {
      const ingredient = $(this).find('span.ingredient');
      const amount = parseFloat(ingredient.attr('data-amount'));
      const unit = ingredient.attr('data-type');

      const amountPerPortion = calcAmountPerPortion(amount, portions);

      const amountString = toReadableFraction(amount, true);

      const item = ingredient
        .text()
        .trim()
        .replace(amountString, '')
        .replace(unit, '')
        .trim();

      ingredients.push({ amount, amountPerPortion, unit, item, raw: ingredient.text().trim() });
      return;
    }

    const ingredient = $(this)
      .text()
      .trim();

    const amountSpan = $(this)
      .find('span')
      .text()
      .trim();

    const { amount, matches: amountMatches } = ingredientAmount(amountSpan);

    const amountPerPortion = calcAmountPerPortion(amount, portions);

    const { unit, match: unitMatch } = ingredientUnit(ingredient, units);

    const unitId = unit !== null ? unit.id : null;

    const wordsToRemove = [...amountMatches, unitMatch]
      .filter(word => word !== null)
      .map(word => word.trim())
      .filter(word => word !== ' ');

    const item = ingredient
      .split(' ')
      .filter(word => !wordsToRemove.includes(word))
      .join(' ')
      .trim();

    ingredients.push({ amount, amountPerPortion, unitId, item, raw: ingredient });
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

const extractRecipe = (html, units) => {
  const $ = cheerio.load(html);
  const metaTag = (value, key = 'name') => scrapeMetaTag($, value, key);

  const title = metaTag('title');
  const description = metaTag('description');
  const providerId = metaTag('Id');
  const difficulty = metaTag('Svårighetsgrad');
  const time = metaTag('Tillagningstid');
  const portions = scrapePortions($);
  const ingredients = scrapeIngredients($, portions, units);
  // console.log('ingredients', ingredients);
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

  const image = metaTagsExists($, 'ImageUrl', 'property')
    ? metaTag('ImageUrl', 'property')
    : $('.hero__image__background')
        .attr('style')
        .split("'")[1]
        .substr(2);

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
    provider: PROVIDER,
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

module.exports = { extractRecipe };
