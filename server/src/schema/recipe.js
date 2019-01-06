const { gql } = require('apollo-server');

module.exports = gql`
  extend type Query {
    recipe(id: ID!): Recipe
  }

  type Recipe {
    id: ID!
    providerId: String
    provider: String
    url: String
    title: String!
    description: String
    difficulty: String
    time: String
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
    name: String!
    order: Int
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
