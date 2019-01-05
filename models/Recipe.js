const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define("recipe", {
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
    time: DataTypes.STRING,
    portions: DataTypes.INTEGER,
    numberOfIngredients: DataTypes.INTEGER,
    type: DataTypes.STRING,
    image: DataTypes.STRING
  });

  Recipe.associate = m => {
    Recipe.hasMany(m.Instruction);
    Recipe.belongsToMany(m.Tag, {
      through: m.RecipeTag
    });
    Recipe.hasOne(m.Score);
    Recipe.hasMany(m.RecipeSection);
  };

  Recipe.insert = async (data, url) => {
    const RecipeTag = sequelize.models.recipe_tag;
    const RecipeSection = sequelize.models.recipe_section;
    const RecipeSectionIngredient = sequelize.models.recipe_section_ingredient;
    const Instruction = sequelize.models.instruction;
    const Ingredient = sequelize.models.ingredient;
    const Tag = sequelize.models.tag;
    const Score = sequelize.models.score;

    const recipeData = data.recipe;
    recipeData.url = url;

    const recipe = await Recipe.create(recipeData, {
      include: [Score, Instruction]
    });

    await asyncForEach(data.ingredientSections, async sectionData => {
      const section = await RecipeSection.create({
        recipeId: recipe.id,
        order: sectionData.order,
        name: sectionData.name
      });

      await asyncForEach(sectionData.ingredients, async ingredientData => {
        let ingredient;
        await Ingredient.findOrCreate({
          where: { name: ingredientData.name }
        }).spread(i => (ingredient = i.get({ plain: true })));

        await RecipeSectionIngredient.create({
          ingredientId: ingredient.id,
          recipeSectionId: section.id,
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
  };

  return Recipe;
};
