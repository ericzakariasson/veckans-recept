module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('ingredient', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    amount: DataTypes.FLOAT,
    amountPerPortion: DataTypes.FLOAT,
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    raw: DataTypes.STRING
  });

  Ingredient.associate = models => {
    Ingredient.belongsTo(models.Recipe);
    Ingredient.belongsTo(models.Unit);
  };

  return Ingredient;
};
