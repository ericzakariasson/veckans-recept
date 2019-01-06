module.exports = {
  Query: {},
  Ingredient: {
    item: async (ingredient, args, { models }) => {
      return models.Item.findByPk(ingredient.itemId);
    },
    unit: async (ingredient, args, { models }) => {
      return models.Unit.findByPk(ingredient.unitId);
    }
  }
};
