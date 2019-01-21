module.exports = {
  Query: {
    items: async (_, args, { models }) => {
      return models.Item.findAll();
    },
    units: async (_, args, { models }) => {
      return models.Unit.findAll();
    }
  },
  Ingredient: {
    item: async (ingredient, args, { models }) => {
      return models.Item.findByPk(ingredient.itemId);
    },
    unit: async (ingredient, args, { models }) => {
      return models.Unit.findByPk(ingredient.unitId);
    }
  }
};
