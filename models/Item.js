const { modelOptions } = require('./index');

module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    'item',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    modelOptions
  );

  Item.associate = models => {
    Item.belongsToMany(models.Section, {
      through: models.Ingredient
    });
  };

  return Item;
};
