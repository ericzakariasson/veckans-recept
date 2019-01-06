const { gql } = require('apollo-server');

const recipeSchema = require('./recipe');
const ingredientSchema = require('./ingredient');

const linkSchema = gql`
  type Query {
    _: Boolean
  }
`;

module.exports = [linkSchema, ingredientSchema, recipeSchema];
