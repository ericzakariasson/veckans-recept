const { gql } = require('apollo-server');

module.exports = gql`
  extend type Query {
    ingredient(id: ID!): Ingredient
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
`;
