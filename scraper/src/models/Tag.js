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
    Tag.belongsToMany(models.Recipe, {
      through: {
        model: 'recipe_tag',
        as: 'tags',
        unique: false
      }
    });
  };

  return Tag;
};
