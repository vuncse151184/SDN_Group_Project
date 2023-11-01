const Meals = require("../Model/meal");

class mealController {
  index(req, res, next) {
    Meals.find({})
      .then((meals) => {
        const dataMeal = {
          status: 1,
          data: meals.map((meal) => ({
            mealId: meal.mealId,
            isDelete: meal.isDelete,
            mealName: meal.mealName,
          })),
        };
        res.json(dataMeal);
      })
      .catch(next);
  }
}
module.exports = new mealController();
