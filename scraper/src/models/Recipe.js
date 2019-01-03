const { asyncForEach } = require('../helpers');

module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('recipe', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    providerId: {
      type: DataTypes.STRING
    },
    provider: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    difficulty: DataTypes.STRING,
    time: DataTypes.STRING,
    portions: DataTypes.INTEGER,
    numberOfIngredients: DataTypes.INTEGER,
    type: DataTypes.STRING,
    image: DataTypes.STRING
  });

  Recipe.associate = models => {
    Recipe.hasMany(models.Ingredient, { as: 'ingredients' });
    Recipe.hasMany(models.Instruction, { as: 'instructions' });
    Recipe.belongsToMany(models.Tag, {
      through: {
        model: 'recipe_tag',
        as: 'recipes',
        unique: false
      }
    });
    Recipe.hasOne(models.Score);
  };

  Recipe.insert = async recipeData => {
    const Ingredient = sequelize.models.ingredient;
    const Unit = sequelize.models.unit;
    const Tag = sequelize.models.tag;
    const Instruction = sequelize.models.instruction;
    const Score = sequelize.models.score;

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
        },
        {
          model: Instruction,
          as: 'instructions'
        },
        {
          model: Tag
        },
        {
          model: Score
        }
      ]
    });

    await asyncForEach(recipe.ingredients, async ingredient => {
      ingredient.setDataValue('Unit', await ingredient.getUnit());
    });
  };

  return Recipe;
};
