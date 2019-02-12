const { modelOptions } = require('../config/config');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      createdAccount: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    modelOptions
  );

  User.associate = models => {
    User.hasMany(models.Week);
    User.belongsToMany(models.Recipe, {
      through: models.Favorite,
      as: 'favorites'
    });
  };

  return User;
};
