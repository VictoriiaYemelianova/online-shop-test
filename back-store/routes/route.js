const user = require('./user');
const category = require('./category');
const product = require('./product');
const selectedlist = require('./selectedlist');

module.exports = function(router) {
  user(router);
  category(router);
  product(router);
  selectedlist(router);
}