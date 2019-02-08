const { modelOptions } = require('../config/config');

module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define(
    'section',
    {
      name: {
        type: DataTypes.STRING
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    modelOptions
  );

  Section.associate = models => {
    Section.belongsTo(models.Recipe);

    Section.belongsToMany(models.Item, {
      through: models.Ingredient
    });
  };

  return Section;
};
