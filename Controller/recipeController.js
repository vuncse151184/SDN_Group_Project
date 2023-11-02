const Recipes = require("../Model/recipe");

class recipeController {
  index(req, res, next) {
    console.log(req.user)
    Recipes.find({})
      .sort({ createdAt: -1 })
      .populate("meal", "mealName")
      .populate("age", "ageName")
      .populate("ingredientOfRecipeVMs")
      .then((recipes) => {
        console.log(recipes);
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
          // .map((recipe) => ({
          //   recipeId: recipe.recipeId,
          //   recipeName: recipe.recipeName,
          //   mealId: recipe.meal.mealId,
          //   mealName: recipe.meal.mealName,
          //   recipeImage: recipe.recipeImage,
          //   ageId: recipe.age.ageId,
          //   ageName: recipe.age.ageName,
          //   isFavorite: false,
          //   totalFavorite: recipe.totalFavorite,
          //   totalRate: 1,
          //   aveRate: 5,
          //   forPremium: recipe.forPremium,
          // })),
        };
        res.json(dataRecipe);
      })
      .catch(next);
  }

  create(req, res, next) {
    const recipe = new Recipes(req.body);
    recipeController
      .save()
      .then(() =>
        res.json({
          status: "Success",
          message: "Add Success",
        })
      )
      .catch((error) => {});
  }

  detail(req, res, next) {
    const recipeId = req.params.recipeId;
    Orchids.findById(recipeId)
      .populate("category", "name")
      .populate("age", "ageName")
      .populate("ingredientOfRecipeVMs")
      .then((recipe) => {
        const dataRecipe = {
          status: "Success",
          isPremium: false,
          data: [
            {
              recipeId: recipe.recipeId,
              recipeName: recipe.recipeName,
              mealId: recipe.meal.mealId,
              mealName: recipe.meal.mealName,
              recipeImage: recipe.recipeImage,
              recipeDesc: recipe.recipeDesc,
              prepareTime: recipe.prepareTime,
              standTime: recipe.standTime,
              cookTime: recipe.cookTime,
              totalTime: recipe.totalTime,
              servings: recipe.servings,
              protein: 0,
              carbohydrate: 0,
              fat: 0,
              calories: 0,
              ageId: recipe.age.ageId,
              ageName: recipe.age.ageName,
              isFavorite: false,
              totalFavorite: 0,
              totalRate: 1,
              aveRate: 5,
              forPremium: recipe.forPremium,
              cusRating: "",
              directionVMs: recipe.directionVMs,
              ingredientOfRecipeVMs: recipe.ingredientOfRecipeVMs,
              ratingVMs: [],
            },
          ],
        };
        res.json(dataRecipe);
      });
  }

  update(req, res, next) {
    Recipes.updateOne({ recipeId: req.params.recipeId }, req.body).then(() => {
      res.json({
        status: "Success",
        message: "Update Success",
      });
    });
  }

  remove(req, res, next) {
    Recipes.findByIdAndDelete({ recipeId: req.params.recipeId }).then(() => {
      res.json({
        status: "Success",
        message: "Remove Success",
      });
    });
  }
}
module.exports = new recipeController();
