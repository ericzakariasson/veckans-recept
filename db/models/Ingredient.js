const { modelOptions } = require('../config/config');

module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define(
    'ingredient',
    {
      amount: DataTypes.FLOAT,
      amountPerPortion: DataTypes.FLOAT
    },
    modelOptions
  );

  Ingredient.associate = models => {
    Ingredient.belongsTo(models.Unit);
  };

  return Ingredient;
};
