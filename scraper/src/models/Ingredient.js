module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('ingredient', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    amount: DataTypes.FLOAT,
    amountPerPortion: DataTypes.FLOAT,
    item: DataTypes.STRING,
    raw: DataTypes.STRING
  });

  Ingredient.associate = models => {
    Ingredient.hasOne(models.Unit);
  };

  return Ingredient;
};
