module.exports = (sequelize, DataTypes) => {
  const Unit = sequelize.define('unit', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    short: {
      type: DataTypes.STRING,
      unique: true
    },
    qty: DataTypes.FLOAT,
    type: DataTypes.STRING
  });

  Unit.associate = models => {
    // Unit.belongsToMany(models.Ingredient);
  };

  return Unit;
};
