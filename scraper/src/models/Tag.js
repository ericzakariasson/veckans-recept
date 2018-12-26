module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('tag', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING
  });

  Tag.associate = models => {
    Tag.belongsToMany(models.Recipe);
  };

  return Tag;
};
