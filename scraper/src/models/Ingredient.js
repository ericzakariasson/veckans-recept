module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('ingredient', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    amount: DataTypes.FLOAT,
    amountForRecipe: DataTypes.FLOAT
  });

  Ingredient.associate = models => {
    Ingredient.hasOne(models.Unit);
  };

  return Ingredient;
};
