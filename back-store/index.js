var express         = require('express');
var bodyParser = require('body-parser');
var path            = require('path'); 
var cors = require('cors');
var app = express();

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
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

app.listen(3000, function(){
  console.log('Express server listening on port ' + 3000);
});