module.exports = {
  Query: {
    recipe: async (_, { id }, { models }) => {
      return models.Recipe.findByPk(id);
    }
  },
  Recipe: {
    sections: async (recipe, args, { models }) => {
      return models.RecipeSection.findAll({
        where: {
          recipeId: recipe.id
        }
      });
    }
  },
  Section: {
    ingredients: async (section, args, { models }) => {
      return models.RecipeSectionIngredient.findAll({
        where: {
          recipeSectionId: section.id
        },
        include: [
          {
            model: models.Ingredient
          }
        ]
      }).map(el => el.get({ plain: true }));
    }
  }
};
