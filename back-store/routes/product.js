const models = require('../models/index');
const helpers = require('./helpers');

module.exports = function(router) {
  router.get('/api/products/:name', async (req, res, next) => {
    try {
      const category = await helpers.getCategory(req.params.name);
  
      const products = await models.Product.findAll({
        where: {
          idCategory: category.id
        }
      })
  
      res.items = products;
      console.log(category)
      next();
    } catch(err) {
      const message = err.message;
      res.message = message;

      next();
    }
  })
  router.post('/api/:name/create-product',  async (req, res, next) => {
    try {
      const category = await helpers.getCategory(req.params.name);

      const currentProduct = {
        name: req.body.name,
        imgUrl: req.body.imgUrl,
        price: req.body.price,
        idCategory: category.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const newProduct = await models.Product.create(currentProduct);
      res.items = newProduct;

      next();
    } catch(err) {
      const message = err.message;
      res.message = message;

      next();
    }
  })
 
}