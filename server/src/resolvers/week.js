// const { literal, Op } = require('sequelize');

const weekOptions = models => ({
  include: [{ model: models.WeekRecipe, as: 'recipes' }],
  order: [[{ model: models.WeekRecipe, as: 'recipes' }, 'order', 'ASC']]
});

module.exports = {
  Query: {
    week: async (parent, { id }, { models }) => {
      const w = await models.Week.findByPk(id, weekOptions(models));

      return w;
    },
    weeks: async (parent, _, { models }) => {
      return models.Week.findAll(weekOptions(models));
    }
  },
  WeekRecipes: {
    recipe: async ({ recipeId }, args, { models }) => {
      return models.Recipe.findByPk(recipeId);
    }
  },
  Mutation: {
    createWeek: async (parent, { input }, { models }) => {
      const week = await models.Week.create(
        { email: input.email, recipes: input.week },
        {
          include: [
            {
              model: models.WeekRecipe,
              as: 'recipes'
            }
          ]
        }
      );

      return {
        url: `/vecka/${week.id}`
      };
    }
  }
};
