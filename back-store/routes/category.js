const models = require('../models/index');

module.exports = function(router) {
  router.get('/api/categories', async (req, res, next) => {
    try {
      const categories = await models.Category.findAll({
        include: {
          model: models.Category
        }
      });

      res.items = categories.filter(el => !el.subcategory);
      next();
    } catch (err) {
      res.message = err.message;
      next();
    }
  });
  
  router.post('/api/categories/create', async (req, res, next) => {
    try {
      const modelCategory = {
        name: req.body.name,
        imgUrl: req.body.imgUrl,
        subcategory: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      if (req.body.subcategory) {
        modelCategory.subcategory = req.body.subcategory;
      }

      const newCategory = await models.Category.create(modelCategory);
      res.items = newCategory;

      next();
    } catch (err) {
      res.message = err.message;
      next();
    }
  });

  router.put('/api/categories/update', async (req, res, next) => {
    try {
      const modelCategory = {
        id: req.body.id,
        name: req.body.name,
        imgUrl: req.body.imgUrl,
        subcategory: null,
        updatedAt: new Date()
      }

      if (req.body.subcategory) {
        modelCategory.subcategory = req.body.subcategory;
      }

      const updatedCategory = await models.Category.update(modelCategory, {
        where: {
          id: req.body.id
        }
      });

      // const updatedCategory = await models.Category.findAll();

      res.items = updatedCategory;
      next();
    } catch(err) {
      res.message = err.message;
      next();
    }
  })

  router.delete('/api/categories/:id', async (req, res, next) => {
    try {
      const deletedCategory = await models.Category.destroy({
        where: {
          id: req.params.id
        },
        include: {
          model: models.Category,
          model: models.Product
        }
      })
      
      res.items = deletedCategory;
      next()
    } catch(err) {
      res.message = err.message;
      next();
    }
  });
}