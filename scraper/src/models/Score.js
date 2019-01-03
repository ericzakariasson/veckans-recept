module.exports = (sequelize, DataTypes) => {
  const Score = sequelize.define('score', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
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
  });

  Score.associate = models => {
    Score.belongsTo(models.Recipe);
  };

  return Score;
};
