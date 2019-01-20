// const { literal, Op } = require('sequelize');

module.exports = {
  Query: {
    week: async (parent, { id }, { models }) => {
      return models.Week.findByPk(id, {
        include: [models.WeekRecipe]
      });
    }
  },
  Mutation: {
    createWeek: async (parent, { email, recipes }, { models }) => {
      const week = await models.Week.create(
        { email, recipes },
        {
          include: [models.WeekRecipe]
        }
      );

      return {
        url: `/vecka/${week.id}`
      };
    }
  }
};
