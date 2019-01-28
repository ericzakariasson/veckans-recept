const { gql } = require('apollo-server');

const recipeSchema = require('./recipe');
const ingredientSchema = require('./ingredient');
const weekSchema = require('./week');

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

module.exports = [linkSchema, ingredientSchema, recipeSchema, weekSchema];
