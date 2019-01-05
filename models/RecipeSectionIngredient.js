module.exports = (sequelize, DataTypes) => {
  const RecipeSectionIngredient = sequelize.define('recipe_section_ingredient', {
    amount: DataTypes.FLOAT,
    amountPerPortion: DataTypes.FLOAT
  });

  RecipeSectionIngredient.associate = models => {
    RecipeSectionIngredient.belongsTo(models.Unit);
  };

  return RecipeSectionIngredient;
};
