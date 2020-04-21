module.exports = {
  getCategory: async function(name) {
    await models.Category.findOne({
      where: {
        name
      }
    })
  }
}