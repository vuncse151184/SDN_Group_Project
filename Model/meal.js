const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new Schema(
  {
    mealId: { type: mongoose.Types.ObjectId, required: true },
    mealName: { type: String, require: true },
    isDelete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Meals = mongoose.model("Meals", mealSchema);
module.exports = Meals;
