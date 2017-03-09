const db = require('./server/models');

const adminRole = { title: 'admin' };
const newUser = {};
newUser.username = 'stuffy';
newUser.firstname = 'allen';
newUser.lastname = 'Chichi';
newUser.password = 'hakunamatata';
newUser.email = 'testy@testy.com';
newUser.roleId = 1;

db.sequelize.sync({ force: true })
.then(() => db.Roles.create(adminRole))
.then((role) => {
  console.log(role);
  return db.Users.create(newUser);
})
.then((user) => {
  console.log(user);
});
