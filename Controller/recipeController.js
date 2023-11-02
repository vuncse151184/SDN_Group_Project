const Recipes = require("../Model/recipe");

class recipeController {
  index(req, res, next) {
    Recipes.find({})
      .sort({ createdAt: -1 })
      .populate("meal", "mealName")
      .populate("age", "ageName")
      .populate("ingredientOfRecipeVMs")
      .then((recipes) => {
        if (req.user.isAdmin) {
          const dataRecipe = {
            status: "Success",
            data: recipes,
          };
          res.json(dataRecipe);
        } else {
          res.json({
            status: "Failed",
            message: "Role denied",
          });
        }
      })
      .catch(next);
  }

  mostFavorite(req, res, next) {
    Recipes.find({})
      .sort({ totalFavorite: -1 })
      .populate("meal", "mealName")
      .populate("age", "ageName")
      .then((recipes) => {
        const dataRecipe = {
          status: "Success",
          data: recipes,
        };
        res.json(dataRecipe);
      })
      .catch(next);
  }

  create(req, res, next) {
    if (req.body.recipeName.trim() === "") {
      res.json({
        status: "Failed",
        message: "Name cannot empty",
      });
    } else if (req.body.recipeDesc.trim() === "") {
      res.json({
        status: "Failed",
        message: "Description cannot empty",
      });
    } else if (req.body.meal.trim() === "") {
      res.json({
        status: "Failed",
        message: "Meal cannot empty",
      });
    } else if (req.body.age.trim() === "") {
    } else if (req.body.directionVMs.length === 0) {
      res.json({
        status: "Failed",
        message: "Directions cannot empty",
      });
    } else if (req.body.ingredientOfRecipeVMs.length === 0) {
      res.json({
        status: "Failed",
        message: "Ingredient cannot empty",
      });
    }
    const recipe = new Recipes({
      recipeName: req.body.recipeName,
      recipeDesc: req.body.recipeDesc,
      prepareTime: req.body.prepareTime,
      standTime: req.body.standTime,
      cookTime: req.body.cookTime,
      totalTime: req.body.totalTime || 0,
      servings: req.body.servings,
      meal: req.body.meal,
      recipeImage: req.body.recipeImage,
      age: req.body.age,
      forPremium: req.body.forPremium,
      directionVMs: req.body.directionVMs,
      ingredientOfRecipeVMs: req.body.ingredientOfRecipeVMs,
    });

    recipe
      .save()
      .then(() =>
        res.json({
          status: "Success",
          message: "Add Success",
        })
      )
      .catch((error) =>
        res.json({
          status: "Failed",
          message: "Add Failed",
        })
      );
  }

  detail(req, res, next) {
    const recipeId = req.params.recipeId;
    Recipes.findById(recipeId)
      .populate("meal", "mealName")
      .populate("age", "ageName")
      .populate("ingredientOfRecipeVMs")
      .then((recipe) => {
        const directionVMs = recipe.directionVMs.map((x) => ({
          directionNum: x.directionNum,
          directionDesc: x.directionDesc,
          directionImage: x.directionImage,
        }));
        const ingredientOfRecipeVMs = recipe.ingredientOfRecipeVMs.map((x) => ({
          ingredientId: x.ingredientId,
          quantity: x.quantity,
        }));
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
    if (req.body.recipeName.trim() === "") {
      res.json({
        status: "Failed",
        message: "Name cannot empty",
      });
    } else if (req.body.recipeDesc.trim() === "") {
      res.json({
        status: "Failed",
        message: "Description cannot empty",
      });
    } else if (req.body.meal.trim() === "") {
      res.json({
        status: "Failed",
        message: "Meal cannot empty",
      });
    } else if (req.body.age.trim() === "") {
    } else if (req.body.directionVMs.length === 0) {
      res.json({
        status: "Failed",
        message: "Directions cannot empty",
      });
    } else if (req.body.ingredientOfRecipeVMs.length === 0) {
      res.json({
        status: "Failed",
        message: "Ingredient cannot empty",
      });
    }
    Recipes.updateOne(
      { recipeId: req.params.recipeId },
      {
        recipeName: req.body.recipeName,
        recipeDesc: req.body.recipeDesc,
        prepareTime: req.body.prepareTime,
        standTime: req.body.standTime,
        cookTime: req.body.cookTime,
        totalTime: req.body.totalTime || 0,
        servings: req.body.servings,
        meal: req.body.meal,
        recipeImage: req.body.recipeImage,
        age: req.body.age,
        forPremium: req.body.forPremium,
        directionVMs: req.body.directionVMs,
        ingredientOfRecipeVMs: req.body.ingredientOfRecipeVMs,
      }
    ).then(() => {
      res.json({
        status: "Success",
        message: "Update Success",
      });
    });
  }

  remove(req, res, next) {
    Recipes.findByIdAndDelete({ _id: req.params.recipeId }).then(() => {
      res.json({
        status: "Success",
        message: "Remove Success",
      });
    });
  }
}
module.exports = new recipeController();
