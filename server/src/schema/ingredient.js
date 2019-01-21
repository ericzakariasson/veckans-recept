const { gql } = require('apollo-server');

module.exports = gql`
  extend type Query {
    ingredient(id: ID!): Ingredient
    items: [Item]
    units: [Unit]
  }

  type Ingredient {
    item: Item!
    amount: Float!
    amountPerPortion: Float
    unit: Unit
  }

  type Item {
    id: Int!
    name: String!
  }

  type Unit {
    id: Int!
    name: String!
    short: String!
    qty: Float
    type: String
  }
`;
