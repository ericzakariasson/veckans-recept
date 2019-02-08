const { modelOptions } = require('../config/config');

module.exports = (sequelize, DataTypes) => {
  const Unit = sequelize.define(
    'unit',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      short: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      qty: DataTypes.FLOAT,
      type: DataTypes.STRING
    },
    modelOptions
  );

  Unit.associate = models => {
    Unit.hasMany(models.Ingredient);
  };

  return Unit;
};
