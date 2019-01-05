module.exports = (sequelize, DataTypes) => {
  const Unit = sequelize.define('unit', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    short: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    qty: DataTypes.FLOAT,
    type: DataTypes.STRING
  });

  Unit.associate = models => {
    // Unit.belongsToMany(models.Ingredient, {
    //   through: 'ingredient_unit',
    //   foreignKey: 'unitId',
    //   allowNull: true
    // });
  };

  return Unit;
};
