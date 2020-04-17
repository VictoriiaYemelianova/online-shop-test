const express         = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const models = require('./models/index');

const router = express.Router();

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

app.get('/api', function (req, res) {
  res.send('API is running');
});

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
    next;
  }
});

router.use(function (req, res, nex) {
  const result = {
    success: false,
    items: [],
    message: ''
  };

  if (res.items) {
    result.success = true;
    result.items.push(res.items);
  } else {
    result.message = res.message;
  }

  res.send(result);
});

app.listen(3000, function(){
  console.log('Express server listening on port ' + 3000);
});