const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false
});

const models = {
  Recipe: sequelize.import('../../models/Recipe'),
  RecipeTag: sequelize.import('../../models/RecipeTag'),
  RecipeSection: sequelize.import('../../models/RecipeSection'),
  RecipeSectionIngredient: sequelize.import('../../models/RecipeSectionIngredient'),
  Ingredient: sequelize.import('../../models/Ingredient'),
  Instruction: sequelize.import('../../models/Instruction'),
  Tag: sequelize.import('../../models/Tag'),
  Unit: sequelize.import('../../models/Unit'),
  Score: sequelize.import('../../models/Recipe')
};

Object.keys(models).forEach(key => {
  if (models[key].associate) {
    models[key].associate(models);
  }
});

module.exports = {
  sequelize,
  models
};
