module.exports = {
  Query: {
    recipe: async (_, { id }, { models }) => {
      return models.Recipe.findByPk(id);
    },
    recipes: async (_, {}, { models }) => {
      return models.Recipe.findAll();
    }
  },
  Recipe: {
    sections: async (recipe, args, { models }) => {
      return models.Section.findAll({
        where: {
          recipeId: recipe.id
        },
        order: [['order', 'ASC']]
      });
    },
    tags: async (recipe, args, { models }) => {
      return models.Tag.findAll({
        attributes: ['name'],
        include: [
          {
            model: models.Recipe,
            where: { id: recipe.id }
          }
        ]
      });
    },
    instructions: async (recipe, args, { models }) => {
      return models.Instruction.findAll({
        where: {
          recipeId: recipe.id
        },
        order: [['step', 'ASC']]
      });
    }
  },
  Section: {
    ingredients: async (section, args, { models }) => {
      return models.Ingredient.findAll({
        where: {
          sectionId: section.id
        }
      });
    }
  }
};
