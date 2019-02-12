const { modelOptions } = require('../config/config');

module.exports = (sequelize, DataTypes) => {
  const WeekRecipe = sequelize.define(
    'week_recipe',
    {
      order: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      day: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    modelOptions
  );

  WeekRecipe.associate = models => {
    WeekRecipe.belongsTo(models.Recipe);
    WeekRecipe.belongsTo(models.Week);
  };

  return WeekRecipe;
};
