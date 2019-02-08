const { modelOptions } = require('../config/config');

module.exports = sequelize => {
  const RecipeTag = sequelize.define('recipe_tag', {}, modelOptions);

  return RecipeTag;
};
