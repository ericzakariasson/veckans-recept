const { modelOptions } = require('../config/config');

module.exports = (sequelize, DataTypes) => {
  const Week = sequelize.define(
    'week',
    {
      name: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
      /* url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true
        }
      } */
    },
    modelOptions
  );

  Week.associate = models => {
    Week.belongsTo(models.User);
    Week.hasMany(models.WeekRecipe, { as: 'recipes' });
  };

  return Week;
};
