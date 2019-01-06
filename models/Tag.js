const { modelOptions } = require('./index');

module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'tag',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    modelOptions
  );

  Tag.associate = models => {
    Tag.belongsToMany(models.Recipe, {
      through: models.RecipeTag
    });
  };

  return Tag;
};
