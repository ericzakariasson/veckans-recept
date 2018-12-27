const { UNITS } = require('./constants');
const { models, sequelize } = require('./models');

module.exports = async () => {
  await sequelize.sync();
  await models.Unit.bulkCreate(UNITS, { ignoreDuplicates: true });
};
