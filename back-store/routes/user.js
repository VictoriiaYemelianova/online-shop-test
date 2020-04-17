const models = require('../models/index');

module.exports = function(router) {
  router.post('/api/login', async (req, res, next) => {
    try {
      const user = await models.User.findOne({
        where: {
          login: req.body.login,
          pass: req.body.pass
        }
      });
  
      if (!user) {
        res.message = 'Неверное имя пользователя или пароль.';
      } else {
        res.items = user;
      }
  
      next();
    } catch (err) {
      res.message = err.message;
      next();
    }
  });
  
  router.post('/api/register', async (req, res, next) => {
    try {
      const user = await models.User.findOne({
        where: {
          login: req.body.login,
          pass: req.body.pass
        }
      });
  
      if (!user) {
        const currentData = {
          login: req.body.login,
          pass: req.body.pass,
          role: req.body.role,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        
        const newUser = await models.User.create(currentData);
        res.items = newUser;
      } else {
        const message = 'Пользователь с таким именем уже существует.';
        res.message = message;
      }
  
      next();
  
    } catch (err) {
      const message = err.message;
      res.message = message;
      next();
    }
  });
}