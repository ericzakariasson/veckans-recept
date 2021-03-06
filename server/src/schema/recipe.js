const { gql } = require('apollo-server');

module.exports = gql`
  extend type Query {
    recipe(id: ID!): Recipe
    recipes: [Recipe!]
    randomRecipes(limit: Int, ids: [Int]!): [Recipe]!
  }

  type Recipe {
    id: Int!
    providerId: String
    provider: String
    url: String
    title: String!
    description: String
    difficulty: String
    time: Int
    portions: Int
    numberOfIngredients: Int
    type: String
    image: String
    sections: [Section]
    instructions: [Instruction]
    tags: [Tag]
    score: Score
  }

  type Section {
    name: String
    order: Int!
    ingredients: [Ingredient]!
  }

  type Instruction {
    step: Int!
    text: String!
  }

  type Score {
    score: Int
    averageScore: Int!
    votes: Int!
  }

  type Tag {
    name: String!
  }
`;
