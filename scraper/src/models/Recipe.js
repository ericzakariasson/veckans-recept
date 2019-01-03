const { asyncForEach } = require('../helpers');

module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('recipe', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    providerId: DataTypes.STRING,
    provider: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    difficulty: DataTypes.STRING,
    time: DataTypes.STRING,
    portions: DataTypes.INTEGER,
    numberOfIngredients: DataTypes.INTEGER,
    type: DataTypes.STRING,
    image: DataTypes.STRING
  });

  Recipe.associate = models => {
    Recipe.hasMany(models.Ingredient, { foreignKey: 'recipeId', as: 'ingredients' });
    // Recipe.hasMany(models.Instruction);
    // Recipe.hasMany(models.Tag);
    // Recipe.hasOne(models.Score);
  };

  Recipe.insert = async recipeData => {
    const Ingredient = sequelize.models.ingredient;
    const Unit = sequelize.models.unit;
    const recipe = await Recipe.create(recipeData, {
      include: [
        {
          model: Ingredient,
          as: 'ingredients',
          include: [
            {
              model: Unit
            }
          ]
        }
      ]
    });

    await asyncForEach(recipe.ingredients, async ingredient => {
      ingredient.setDataValue('Unit', await ingredient.getUnit());
    });
  };

  return Recipe;
};
