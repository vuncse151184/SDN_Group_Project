const Ingredients = require("../Model/ingredients");

class ingredientController {
  index(req, res, next) {
    Ingredients.find({})
      .then((ingredients) => {
        const dataIngredient = {
          status: "Success",
          data: ingredients
        };
        res.json(dataIngredient);
      })
      .catch(next);
  }
}
module.exports = new ingredientController();
