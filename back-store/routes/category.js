const models = require('../models/index');

module.exports = function (router) {
  router.get('/api/categories', async (req, res, next) => {
    try {
      const categories = await models.Category.findAll();
      res.items = categories;

      next();
    } catch (err) {
      const message = err.message;
      res.message = message;

      next();
    }
  });

  router.post('/api/categories/create', async (req, res, next) => {
    try {
      const category = await models.Category.findOne({
        where: {
          name: req.body.name
        }
      })

      if (!category) {
        const currentCategory = {
          name: req.body.name,
          imgUrl: req.body.imgUrl,
          createdAt: new Date(),
          updatedAt: new Date()
        }

        const newCategory = await models.Category.create(currentCategory);
        res.items = newCategory;
      } else {
        const message = 'Категория с таким именем уже существует';
        res.message = message;
      }

      next();
    } catch (err) {
      const message = err.message;
      res.message = message;
      next();
    }
  });

  router.put('/api/categories/update', async (req, res, next) => {
    try {
      const { name, imgUrl, id } = req.body;

      await models.Category.update({
        name: name,
        imgUrl: imgUrl,
        updatedAt: new Date()
      },
      {
        where: {
          id
        }
      });

      const updatedCategory = await models.Category.findOne({
        where: {
          id
        }
      });

      res.items = updatedCategory;

      next();
    } catch(err) {
      const message = err.message;
      res.message = message;
      next();
    }
  })
}