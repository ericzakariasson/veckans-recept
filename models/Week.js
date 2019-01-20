const { modelOptions } = require('./index');

module.exports = (sequelize, DataTypes) => {
  const Week = sequelize.define(
    'week',
    {
      name: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
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
    Week.hasMany(models.WeekRecipe);
  };

  return Week;
};
