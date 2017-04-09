const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'rebby',
        firstname: 'Rebby',
        lastname: 'Nwosu',
        email: 'rebby@yahoo.com',
        password: bcrypt.hashSync('123456', bcrypt.genSaltSync(10)),
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: function (queryInterface, Sequelize) {

  }
};
