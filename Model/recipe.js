const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const directionSchema = new Schema(
  {
    directionId: { type: mongoose.Types.ObjectId, required: true },
    directionNum: { type: Number, require: true },
    directionDesc: { type: String, require: true },
    directionImage: { type: String },
  },
  { timestamps: true }
);

const favoriteSchema = new Schema(
  {
    recipeId: { type: mongoose.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

const recipeSchema = new Schema(
  {
    recipeId: { type: mongoose.Types.ObjectId, required: true },
    recipeName: { type: String, require: true },
    recipeDesc: { type: String, require: true },
    prepareTime: { type: Number, require: true },
    standTime: { type: Number, require: true },
    cookTime: { type: Number, require: true },
    totalTime: { type: Number, require: true },
    servings: { type: Number, require: true },
    meal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meals",
      require: true,
    },
    recipeImage: { type: String, require: true },
    age: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ages",
      require: true,
    },
    forPremium: { type: Boolean, require: true, default: true },
    directionVMs: [directionSchema],
    ingredientOfRecipeVMs: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredients",
      require: true,
    },
  },
  { timestamps: true }
);

const Recipes = mongoose.model("Recipes", recipeSchema);
module.exports = Recipes;
