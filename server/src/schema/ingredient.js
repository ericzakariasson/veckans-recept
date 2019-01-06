const { gql } = require('apollo-server');

module.exports = gql`
  extend type Query {
    ingredient(id: ID!): Ingredient
  }

  type Ingredient {
    item: Item!
    amount: Float!
    amountPerPortion: Float
    unit: Unit
  }

  type Item {
    name: String!
  }

  type Unit {
    name: String!
    short: String!
    qty: Float
    type: String
  }
`;
