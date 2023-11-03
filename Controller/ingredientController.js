const Ingredients = require("../Model/ingredients");
const Recipes = require("../Model/recipe");
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

  create(req, res, next) {
    // if (req.body.recipeName.trim() === "") {
    //   res.json({
    //     status: "Failed",
    //     message: "Name cannot empty",
    //   });
    // } else if (req.body.recipeDesc.trim() === "") {
    //   res.json({
    //     status: "Failed",
    //     message: "Description cannot empty",
    //   });
    // } else if (req.body.meal.trim() === "") {
    //   res.json({
    //     status: "Failed",
    //     message: "Meal cannot empty",
    //   });
    // } else if (req.body.age.trim() === "") {
    // } else if (req.body.directionVMs.length === 0) {
    //   res.json({
    //     status: "Failed",
    //     message: "Directions cannot empty",
    //   });
    // } else if (req.body.ingredientOfRecipeVMs.length === 0) {
    //   res.json({
    //     status: "Failed",
    //     message: "Ingredient cannot empty",
    //   });
    // }
    const ingredient = new Ingredients(req.body);

    if (req.user.isAdmin == true) {
      ingredient.save().then(() =>
        res.json({
          status: "Success",
          message: "Add Success",
        })
      ).catch(error => {
        res.json({
          status: "Failed",
          message: "Add failed"
        })
      })
    } else {
      return res.status(403).send({
        status: "Fail",
        message: "You are not allowed to this function",
      })
    }
  }

  detail(req, res, next) {
    const recipeId = req.params.recipeId;
    Ingredients.findById(recipeId)
      .then((recipe) => {
        const dataRecipe = {
          status: "Success",
          isPremium: false,
          data: {
            _id: recipe._id,
            recipeName: recipe.recipeName,
            recipeDesc: recipe.recipeDesc,
            prepareTime: recipe.prepareTime,
            standTime: recipe.standTime,
            cookTime: recipe.cookTime,
            totalTime: recipe.totalTime || 0,
            servings: recipe.servings,
            meal: recipe.meal,
            recipeImage: recipe.recipeImage,
            age: recipe.age,
            forPremium: recipe.forPremium,
            directionVMs: directionVMs,
            ingredientOfRecipeVMs: ingredientOfRecipeVMs,
          },
        };
        res.json(dataRecipe);
      });
  }

  update(req, res, next) {

    // if (req.body.recipeName.trim() === "") {
    //   res.json({
    //     status: "Failed",
    //     message: "Name cannot empty",
    //   });
    // } else if (req.body.recipeDesc.trim() === "") {
    //   res.json({
    //     status: "Failed",
    //     message: "Description cannot empty",
    //   });
    // } else if (req.body.meal.trim() === "") {
    //   res.json({
    //     status: "Failed",
    //     message: "Meal cannot empty",
    //   });
    // } else if (req.body.age.trim() === "") {
    // } else if (req.body.directionVMs.length === 0) {
    //   res.json({
    //     status: "Failed",
    //     message: "Directions cannot empty",
    //   });
    // } else if (req.body.ingredientOfRecipeVMs.length === 0) {
    //   res.json({
    //     status: "Failed",
    //     message: "Ingredient cannot empty",
    //   });
    // }

    if (req.user.isAdmin) {
      Ingredients.updateOne({ _id: req.params.id }, {
        ingredientName: req.body.ingredientName,
        measure: req.body.measure,
        protein: req.body.protein,
        fat: req.body.fat,
        carbohydrate: req.body.carbohydrate,
      }).then(() => {
        res.json({
          status: "Success",
          message: "Update Success",
        });
      }).catch(error => {
        console.log(error)
      });
    } else {
      return res.status(403).send({
        status: "Fail",
        message: "You are not allowed to this function",
      })
    }

  }

  remove(req, res, next) {
    console.log("------------------", req.params.id)
    if (req.user.isAdmin == true) {
      Recipes.find({ "ingredientOfRecipeVMs.ingredientId": req.params.id }).then(recipes => {
        if (recipes.length === 0) {
          Ingredients.findByIdAndDelete({ _id: req.params.id }).then(() => {
            res.json({
              status: "Success",
              message: "Remove Success",
            });
          }).catch(error => {
            return res.status(400).json({
              status: "Fail",
              message: "Query failed",
            });
          });
        } else {
          return res.status(400).json({
            status: "Fail",
            message: "Can not delete this ingredient, it is used in some recipes",
          });
        }
      })
    } else {
      return res.status(403).send({
        status: "Fail",
        message: "You are not allowed to this function",
      })
    }
  }
}
module.exports = new ingredientController();
