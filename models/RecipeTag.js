module.exports = sequelize => {
  const RecipeTag = sequelize.define('recipe_tag');

  return RecipeTag;
};
