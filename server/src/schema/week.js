const { gql } = require('apollo-server');

module.exports = gql`
  extend type Query {
    week(id: Int): Week
  }

  type Week {
    recipes: [WeekRecipes]!
  }

  type WeekRecipes {
    order: Int!
    day: String!
    recipe: Recipe!
  }

  extend type Mutation {
    createWeek(input: WeekInput): WeekRespone!
  }

  type WeekInput {
    email: String!
    recipes: [WeekRecipeInput]
  }

  type WeekRecipeInput {
    day: String!
    order: Int!
    recipe: Int!
  }

  type WeekRespone {
    url: String!
  }
`;
