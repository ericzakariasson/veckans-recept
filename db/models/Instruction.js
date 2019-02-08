const { modelOptions } = require('../config/config');

module.exports = (sequelize, DataTypes) => {
  const Instruction = sequelize.define(
    'instruction',
    {
      step: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    modelOptions
  );

  Instruction.associate = models => {
    Instruction.belongsTo(models.Recipe);
  };

  return Instruction;
};
