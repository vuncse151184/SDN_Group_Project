const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new Schema(
  {
   
    mealName: { type: String, require: true },
    isDelete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Meals = mongoose.model("Meals", mealSchema);
module.exports = Meals;
