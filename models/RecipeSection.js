module.exports = (sequelize, DataTypes) => {
  const RecipeSection = sequelize.define('recipe_section', {
    name: {
      type: DataTypes.STRING
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  RecipeSection.associate = models => {
    RecipeSection.belongsTo(models.Recipe);

    RecipeSection.belongsToMany(models.Ingredient, {
      through: models.RecipeSectionIngredient,
      as: 'ingredients'
    });
  };

  return RecipeSection;
};
