module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [
    {
      title: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: function (queryInterface, Sequelize) {

  }
};