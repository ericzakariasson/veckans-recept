const weekOptions = models => ({
  include: [{ model: models.WeekRecipe, as: 'recipes' }],
  order: [[{ model: models.WeekRecipe, as: 'recipes' }, 'order', 'ASC']]
});

module.exports = {
  Query: {
    week: async (parent, { id }, { models }) => {
      const options = weekOptions(models);
      return models.Week.findByPk(id, options);
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
      let user;
      await models.User.findOrCreate({
        where: { email: input.email }
      }).spread(u => (user = u.get({ plain: true })));

      const week = await models.Week.create(
        {
          recipes: input.week,
          userId: user.id
        },
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
        id: `${week.id}`
      };
    }
  }
};
