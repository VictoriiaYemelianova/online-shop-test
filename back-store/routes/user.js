const models = require('../models/index');
let jwt = require('jsonwebtoken');
let config = require('../config');
let middleware = require('../middleware');

module.exports = function(router) {
  router.post('/login', async (req, res, next) => {
    try {
      const user = await models.User.findOne({
        where: {
          email: req.body.email
        }
      });

      if (!user) {
        res.message = 'Гser does not exist!';
      } else {
        if (user.pass === req.body.pass) {
          let token = jwt.sign({
            email: user.email,
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
          res.message = 'Wrong password!'
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
          email: req.body.email
        }
      });
  
      if (!user) {
        const currentData = {
          login: req.body.login,
          email: req.body.email,
          pass: req.body.pass,
          role: req.body.role,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        
        const newUser = await models.User.create(currentData);

        if (newUser) {
          let token = jwt.sign({
            email: newUser.email,
            role: newUser.role
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
        const message = 'Error! User alrady exist!';
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