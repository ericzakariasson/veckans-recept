const cheerio = require('cheerio');
const { toReadableFraction } = require('readable-fractions');
const { calculateScore } = require('./helpers');
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

const scrapePortions = $ => {
  const portions = parseInt($('div.servings-picker').attr('data-current-portions'), 10);
  return Number.isNaN(portions) ? null : portions;
};

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

  return tags.map(tag => ({ name: tag }));
};

const calcAmountPerPortion = (amount, portions) => {
  if (!portions) {
    return null;
  }

  return Math.round(parseFloat(amount / portions) * 100) / 100;
};

function extractIngredient($, portions, units, el) {
  if ($(el).find('span.ingredient').length) {
    const ingredient = $(el).find('span.ingredient');
    const amount = parseFloat(ingredient.attr('data-amount'));
    const unit = ingredient.attr('data-type');

    const amountPerPortion = calcAmountPerPortion(amount, portions);

    const amountString = toReadableFraction(amount, true);

    const name = ingredient
      .text()
      .trim()
      .replace(amountString, '')
      .replace(unit, '')
      .trim();

    return { amount, amountPerPortion, unit, name };
  }

  const ingredient = $(el)
    .text()
    .trim();

  const amountSpan = $(el)
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

  const name = ingredient
    .split(' ')
    .filter(word => !wordsToRemove.includes(word))
    .join(' ')
    .trim();

  return { amount, amountPerPortion, unitId, name };
}

const scrapeIngredients = ($, portions, units) => {
  const $extractIngredient = extractIngredient.bind(null, $, portions, units);

  const ingredients = Array.from($('ul.ingredients__list')).map((list, i) => {
    let partName = null;

    const prevIsStrong = $(list)
      .prev()
      .is('strong');

    if (prevIsStrong) {
      partName = $(list)
        .prev('strong')
        .text()
        .trim();
    }

    const partIngredients = Array.from($(list).find('li.ingredients__list__item')).map(ingredientListItem => $extractIngredient(ingredientListItem));

    return {
      order: i,
      name: partName,
      ingredients: partIngredients
    };
  });

  return ingredients;
};

const scrapeInstructions = $ => {
  const instructions = [];
  $('div.cooking-step').each(function _(i) {
    const step = i;
    const text = $(this)
      .find('.cooking-step__content__instruction')
      .text()
      .trim();

    const instruction = { step, text };
    instructions.push(instruction);
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
  const ingredientSections = scrapeIngredients($, portions, units);
  // const ingredientNames = metaTag('ingredients').split(',');

  const numberOfIngredients = ingredientSections.reduce((total, section) => total + section.ingredients.length, 0);
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

  const data = {
    recipe: {
      providerId,
      provider: PROVIDER,
      title,
      description,
      difficulty,
      time,
      portions,
      numberOfIngredients,
      type,
      published,
      image,
      score,
      instructions
    },
    ingredientSections,
    tags
  };

  console.log('Scraped recipe', data.recipe.title);
  return data;
};

module.exports = { extractRecipe };
