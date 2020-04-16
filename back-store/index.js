var express         = require('express');
var bodyParser = require('body-parser');
var path            = require('path'); 
var cors = require('cors');
var app = express();

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
const models = require('./models/index');
// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
//     next();
//   });

// app.use(express.static(path.join(__dirname, 'public')));

app.get('/api', function (req, res) {
  res.send('API is running');
});

app.post('/api/login', async (req, res, next) => {
  try {
    const user = await models.User.findOne({
      where: {
        login: req.body.login,
        pass: req.body.pass
      }
    })
    res.send({
      success: true, user: user
    })
  } catch (err) {
    res.send({
      success: false, 
      message:"Неверное имя пользователя или пароль."
    });
  }
});

app.post('/api/register', async (req, res, next) => {
  try {
    const user = await models.User.findOne({
      where: {
        login: req.body.login,
        pass: req.body.pass
      }
    })

    if (user) {
      res.send({
        success: false, 
        message:"Пользователь с таким именем уже существует."
      });
    } else {
      const currentData = {
        login: req.body.login,
        pass: req.body.pass,
        role: req.body.role,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      const newUser = await models.User.create(currentData);
      
      res.send({
        success: true,
        user: newUser
      })
    }

  } catch (err) {}
})

app.listen(3000, function(){
  console.log('Express server listening on port ' + 3000);
});