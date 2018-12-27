const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});

const models = {
  Unit: sequelize.import('./Unit'),
  Ingredient: sequelize.import('./Ingredient'),
  Recipe: sequelize.import('./Recipe')
  // Instruction: sequelize.import('./Instruction')
  // Tag: sequelize.import('./Tag'),
  // Score: sequelize.import('./Score')
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
