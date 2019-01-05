module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('tag', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Tag.associate = models => {
    Tag.belongsToMany(models.Recipe, {
      through: models.RecipeTag
    });
  };

  return Tag;
};
