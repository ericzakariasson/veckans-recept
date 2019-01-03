module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('tag', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Tag.associate = models => {
    Tag.belongsToMany(models.Recipe, { through: 'recipe_tag' });
  };

  return Tag;
};
