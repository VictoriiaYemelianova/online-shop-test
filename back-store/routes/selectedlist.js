const models = require('../models/index');

module.exports = function (router) {
  router.get('/api/selectedlist/:userId', async (req, res, next) => {
    try {
      const list = await models.Product.findAll({
        include: {
          model: models.Selectedlist,
          where: {
            userId: req.params.userId
          },
          attributes: []
        }
      });

      res.items = list;
      next();
    } catch (err) {
      res.message = err.message;
      next();
    }
  });

  router.post('/api/addselecteditem', async (req, res, next) => {
    try {
      const modelSelectedList = {
        userId: req.body.userId,
        productId: req.body.productId,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const selectedList = await models.Selectedlist.create(modelSelectedList);
      res.items = selectedlist;
      next();
    } catch (err) {
      res.message = err.message;
      next();
    }
  });
}