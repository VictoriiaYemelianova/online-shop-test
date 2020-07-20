const models = require('../models/index');
const helpers = require('./helpers');

module.exports = function(router) {
  router.get('/api/parent-category-products/:id', async (req, res, next) => {
    try {
      const products = await models.Product.findAll({ //id category
        include: {
          model: models.Category,
          where: {
            subcategory: req.params.id
          }
        }
      });
  
      res.items = products;
      next();
    } catch(err) {
      res.message = err.message;
      next();
    }
  })

  router.get('/api/subcategory-products/:id', async (req, res, next) => {
    try {
      const products = await models.Product.findAll({ //id subcategory
        where: {
          idCategory: req.params.id
        }
      });
  
      res.items = products;
      next();
    } catch(err) {
      res.message = err.message;;
      next();
    }
  })

  router.post('/api/create-product',  async (req, res, next) => {
    try {
      const currentProduct = {
        name: req.body.name,
        imgUrl: req.body.imgUrl,
        price: req.body.price,
        idCategory: req.body.idCategory,
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

      await models.Product.update( //возвращает количество измененных элементов 
        currentProduct,
        {
          where: {
            id: req.body.id
          }
        });

        // const updatedProduct = await models.Product.findOne({
        //   where: {
        //     id: req.body.id
        //   }
        // });

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
      const deleteProduct = await models.Product.destroy({  //возвращает количество удаленных элементов 
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

  router.delete('/api/products/delete-all/:id', async (req, res, next) => { //id подкатегории, в которой удаляются все продукты
    try {
       const deleteAllProduct = await models.Product.destroy({ //возвращает количество удаленных элементов 
        where: {
          idCategory: req.params.id
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