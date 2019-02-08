const db = require('../../db/models');

module.exports = {
  models: db,
  sequelize: db.sequelize
};
