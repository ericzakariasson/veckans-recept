const Sequelize = require('sequelize');
const path = require('path');
const { modelFiles } = require('../../models');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false
});

const models = {};

modelFiles.forEach(({ filePath, fileName }) => {
  const model = sequelize.import(path.resolve(filePath));
  models[fileName] = model;
});

Object.keys(models).forEach(key => {
  if (models[key].associate) {
    models[key].associate(models);
  }
});

module.exports = {
  sequelize,
  models
};
