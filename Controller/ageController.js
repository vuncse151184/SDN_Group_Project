const Ages = require("../Model/age");

class ageController {
  index(req, res, next) {
    Ages.find({})
      .then((ages) => {
        const dataAge = {
          status: 1,
          data: ages.map((age) => ({
          
            ageName: age.ageName,
            isDelete: age.isDelete,
          })),
        };
        res.json(dataAge);
      })
      .catch(next);
  }
}
module.exports = new ageController();
