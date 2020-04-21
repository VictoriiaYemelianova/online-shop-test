const models = require('../models/index');

module.exports = {
  getCategory: async function(name) {
   return await models.Category.findOne({
      where: {
        name
      }
    })
  }
}