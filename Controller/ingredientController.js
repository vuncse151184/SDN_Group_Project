const Ingredients = require("../Model/ingredients");

class ingredientController {
  index(req, res, next) {
    Ingredients.find({})
      .then((ingredients) => {
        const dataIngredient = {
          status: "Success",
          data: ingredients.map((ingredient) => ({
            ingredientName: ingredient.ingredientName,
            measure: ingredient.measure,
            protein: ingredient.protein,
            carbohydrate: ingredient.carbohydrate,
            fat: ingredient.fat,
            calories: ingredient.calories,
          })),
        };
        res.json(dataIngredient);
      })
      .catch(next);
  }
}
module.exports = new ingredientController();
