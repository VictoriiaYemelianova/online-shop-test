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
        updatedAt: new Date()
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

  router.put('/api/products/update', async (req, res, next) => {
    try {
      const currentProduct = {
        name: req.body.name,
        imgUrl: req.body.imgUrl,
        price: req.body.price,
        updatedAt: new Date()
      }

      await models.Product.update(
        currentProduct,
        {
          where: {
            id: req.body.id
          }
        })

        const updatedProduct = await models.Product.findOne({
          where: {
            id: req.body.id
          }
        });

        res.items = updatedProduct;
        next();
    } catch(err) {
      const message = err.message;
      res.message = message;

      next();
    }
  })
 
  router.delete('/api/products/:id', async (req, res, next) => {
    try {
      const deleteProduct = await models.Product.destroy({
        where: {
          id: req.params.id
        }
      });

      res.items = deleteProduct;
      next();
    } catch(err) {
      const message = err.message;
      res.message = message;

      next();
    }
  })

  router.delete('/api/products/:name/delete', async (req, res, next) => {
    try {
      const category = await helpers.getCategory(req.params.name);

      const deleteAllProduct = await models.Product.destroy({
        where: {
          idCategory: category.id
        }
      });

      res.items = deleteAllProduct;
      next();
    } catch(err) {
      const message = err.message;
      res.message = message;

      next();
    }
  })
}