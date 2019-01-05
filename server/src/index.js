require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server');
const { sequelize, models } = require('./models');

const typeDefs = gql`
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

  type Ingredient {
    name: String!
    amount: Float!
    amountPerPortion: Float
    unit: Unit!
  }

  type Unit {
    name: String!
    short: String!
    qty: Float
    type: String
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

const resolvers = {
  Query: {
    recipe: async (_, { id }, { models }) => {
      return await models.recipe.findById(id);
    }
  }
};
