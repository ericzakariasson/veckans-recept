require('dotenv').config();

const { UNITS } = require('./constants');
const { models, sequelize } = require('../../models');

const syncUnits = () => {
  sequelize
    .sync()
    .then(() => models.Unit.bulkCreate(UNITS, { ignoreDuplicates: true }))
    .catch(err => console.error(err));
};

syncUnits();
