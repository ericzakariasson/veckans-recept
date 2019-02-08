const { modelOptions } = require('../config/config');

module.exports = (sequelize, DataTypes) => {
  const Score = sequelize.define(
    'score',
    {
      score: {
        type: DataTypes.INTEGER
      },
      averageScore: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      votes: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    modelOptions
  );

  Score.associate = models => {
    Score.belongsTo(models.Recipe);
  };

  return Score;
};
