const { modelOptions } = require('../config/config');

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define(
    'recipe',
    {
      providerId: {
        type: DataTypes.STRING
      },
      provider: {
        type: DataTypes.STRING
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      difficulty: DataTypes.STRING,
      time: DataTypes.INTEGER,
      portions: DataTypes.INTEGER,
      numberOfIngredients: DataTypes.INTEGER,
      type: DataTypes.STRING,
      image: DataTypes.STRING
    },
    modelOptions
  );

  Recipe.associate = m => {
    Recipe.hasMany(m.Instruction);
    Recipe.belongsToMany(m.Tag, {
      through: m.RecipeTag
    });
    Recipe.hasOne(m.Score);
    Recipe.hasMany(m.Section);
    Recipe.belongsToMany(m.User, {
      through: m.Favorite,
      as: 'favorites'
    });
  };

  Recipe.insert = async (data, url) => {
    const exists = await Recipe.findOne({ where: { url } });

    if (exists) {
      console.log(`Recipe '${data.recipe.title}' already scraped`);
      return;
    }

    const {
      section: Section,
      ingredient: Ingredient,
      instruction: Instruction,
      item: Item,
      recipe_tag: RecipeTag,
      tag: Tag,
      score: Score
    } = sequelize.models;

    const recipeData = data.recipe;
    recipeData.url = url;

    const recipe = await Recipe.create(recipeData, {
      include: [Score, Instruction]
    });

    await asyncForEach(data.ingredientSections, async sectionData => {
      const section = await Section.create({
        recipeId: recipe.id,
        order: sectionData.order,
        name: sectionData.name
      });

      await asyncForEach(sectionData.ingredients, async ingredientData => {
        let item;
        await Item.findOrCreate({
          where: { name: ingredientData.name }
        }).spread(i => (item = i.get({ plain: true })));

        await Ingredient.create({
          itemId: item.id,
          sectionId: section.id,
          amount: ingredientData.amount,
          amountPerPortion: ingredientData.amountPerPortion,
          unitId: ingredientData.unitId
        });
      });
    });

    await asyncForEach(data.tags, async tagData => {
      let tag;
      await Tag.findOrCreate({
        where: { name: tagData.name }
      }).spread(t => (tag = t.get({ plain: true })));

      await RecipeTag.create({ recipeId: recipe.id, tagId: tag.id });
    });

    console.log(`Stored recipe: `, recipe.title);
  };

  return Recipe;
};
