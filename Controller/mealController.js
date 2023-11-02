const Meals = require("../Model/meal");

class mealController {
  index(req, res, next) {
    Meals.find({})
      .then((meals) => {
        const dataMeal = {
          status: 1,
          data: meals,
        };
        res.json(dataMeal);
      })
      .catch(next);
  }
}
module.exports = new mealController();
