const models = require('../models/index');
let jwt = require('jsonwebtoken');
let config = require('../config');
let middleware = require('../middleware');

module.exports = function(router) {
  router.post('/login', async (req, res, next) => {
    try {
      const user = await models.User.findOne({
        where: {
          login: req.body.login
        }
      });

      if (!user) {
        res.message = 'Такого пользователя не существует.';
      } else {
        if (user.pass === req.body.pass) {
          let token = jwt.sign({
            login: user.login,
            role: user.role
          },
          config.secret,
          { expiresIn: '24h' } // expires in 24 hours
          );

          let currentUser = {
            user: user,
            token: token
          };

          res.items = currentUser;
        } else {
          res.message = 'Неверный пароль.'
        };
      };
  
      next();
    } catch (err) {
      res.message = err.message;
      next();
    }
  });
  
  router.post('/register', async (req, res, next) => {
    try {
      const user = await models.User.findOne({
        where: {
          login: req.body.login
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

        if (newUser) {
          let token = jwt.sign({
            login: user.login,
            role: user.role
          },
          config.secret,
          { expiresIn: '24h' } // expires in 24 hours
          );

          let currentUser = {
            user: newUser,
            token: token
          };

          res.items = currentUser;
        }
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

  router.use('/api', middleware);
}