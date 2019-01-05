module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('ingredient', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Ingredient.associate = models => {
    Ingredient.belongsToMany(models.RecipeSection, {
      through: models.RecipeSectionIngredient
    });
  };

  return Ingredient;
};
