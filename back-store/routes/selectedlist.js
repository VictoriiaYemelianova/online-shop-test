const models = require('../models/index');

module.exports = function(router) {
  router.get('/api/selectedlist/:userId', async (req, res, next) => {
    try {
      const list = await models.Product.findAll({
        include : {
          model: models.Selectedlist,
          where: {
            userId: req.params.userId
          }
        }
      });

      res.items = list;
      next();
    } catch(err) {
      res.message = err.message;
      next();
    }
  });
}