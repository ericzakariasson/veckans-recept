const { modelOptions } = require('../config/config');

module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('favorite', {}, modelOptions);

  return Favorite;
};
