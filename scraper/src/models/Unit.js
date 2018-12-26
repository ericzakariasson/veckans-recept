module.exports = (sequelize, DataTypes) => {
  const Unit = sequelize.define('unit', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING
  });

  Unit.associate = models => {
    Unit.belongsToMany(models.Ingredient);
  };

  return Unit;
};
