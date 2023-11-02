const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema(
  {
    ingredientId: { type: String, require: true},
    ingredientName: { type: String, require: true },
    measure: { type: String, require: true },
    protein: { type: Number, require: true },
    carbohydrate: { type: Number, require: true },
    fat: { type: Number, require: true },
    calories: { type: Number, require: true },
  },
  { timestamps: true }
);

const Ingredients = mongoose.model("Ingredients", ingredientSchema);
module.exports = Ingredients;
