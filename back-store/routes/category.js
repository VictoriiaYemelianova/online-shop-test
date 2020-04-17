const models = require('../models/index');

module.exports = function(router) {
  // router.get('/api/categories', async (req, res, next) => {
  //   try {
  //     const categories = await models.Category.findAll();
  //     res.items = categories;
  
  //     next();
  //   } catch {
  //     const message = err.message;
  //     res.message = message;
  
  //     next();
  //   }
  // });

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
  } catch {
    const message = err.message;
    res.message = message;
    next();
  }
});

//category

// router.put('/api/:name/update', async (req, res, next) => {
//   try {
//     const category = await models.Category.findOne({
//       where: {
//         name: res.body.name
//       }
//     })


//   } catch {
//     const message = err.message;
//     res.message = message;
//     next();
//   }
// })
}