const { modelOptions } = require('./index');

module.exports = sequelize => {
  const RecipeTag = sequelize.define('recipe_tag', {}, modelOptions);

  return RecipeTag;
};
