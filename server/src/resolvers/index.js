const recipeResolver = require('./recipe');
const ingredientResolver = require('./ingredient');
const weekResolver = require('./week');

module.exports = [recipeResolver, ingredientResolver, weekResolver];
