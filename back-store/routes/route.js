const user = require('./user');
const category = require('./category');

module.exports = function(router) {
  user(router);
  category(router);
}