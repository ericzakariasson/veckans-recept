const { gql } = require('apollo-server');

module.exports = gql`
  extend type Query {
    week(id: Int): Week
    weeks: [Week!]
  }

  type Week {
    id: Int!
    recipes: [WeekRecipes]!
  }

  type WeekRecipes {
    day: String!
    recipe: Recipe!
    order: Int!
  }

  extend type Mutation {
    createWeek(input: WeekInput): WeekResponse
  }

  input WeekInput {
    email: String!
    week: [WeekRecipeInput]
  }

  input WeekRecipeInput {
    day: String!
    recipeId: Int!
    order: Int!
  }

  type WeekResponse {
    url: String!
  }
`;
