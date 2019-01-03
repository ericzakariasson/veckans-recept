module.exports = (sequelize, DataTypes) => {
  const Instruction = sequelize.define('instruction', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    step: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  Instruction.associate = models => {
    Instruction.belongsTo(models.Recipe);
  };

  return Instruction;
};
