'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var data = {
  userRole: {
    title: 'user'
  },
  adminRole: {
    title: 'admin'
  },
  newRole: {
    title: 'guest1'
  },
  badRole: {
    title: ''
  },

  regularUser: {
    username: 'Cole',
    firstname: _faker2.default.name.firstName(),
    lastname: _faker2.default.name.lastName(),
    email: _faker2.default.internet.email(),
    password: _faker2.default.internet.password()
  },
  regularUser1: {
    username: 'damin',
    firstname: 'Daniel',
    lastname: 'Amin',
    email: 'daniel@amin.com',
    password: 'feefeesho'
  },
  regularUser2: {
    username: _faker2.default.internet.userName(),
    firstname: _faker2.default.name.firstName(),
    lastname: _faker2.default.name.lastName(),
    email: _faker2.default.internet.email(),
    password: _faker2.default.internet.password()
  },
  regularUser3: {
    id: 7,
    username: _faker2.default.internet.userName(),
    firstname: _faker2.default.name.firstName(),
    lastname: _faker2.default.name.lastName(),
    email: _faker2.default.internet.email(),
    password: _faker2.default.internet.password()
  },
  adminUser: {
    username: _faker2.default.internet.userName(),
    firstname: _faker2.default.name.firstName(),
    lastname: _faker2.default.name.lastName(),
    email: _faker2.default.internet.email(),
    password: _faker2.default.internet.password(),
    roleId: 1
  },
  adminUser1: {
    username: _faker2.default.internet.userName(),
    firstname: _faker2.default.name.firstName(),
    lastname: _faker2.default.name.lastName(),
    email: _faker2.default.internet.email(),
    password: _faker2.default.internet.password(),
    roleId: 1
  },
  adminUser2: {
    username: _faker2.default.internet.userName(),
    firstname: _faker2.default.name.firstName(),
    lastname: _faker2.default.name.lastName(),
    email: _faker2.default.internet.email(),
    password: _faker2.default.internet.password(),
    roleId: 1
  },
  dontBeAdmin: {
    username: _faker2.default.internet.userName(),
    firstname: _faker2.default.name.firstName(),
    lastname: _faker2.default.name.lastName(),
    email: _faker2.default.internet.email(),
    password: _faker2.default.internet.password(),
    roleId: 1
  },
  publicDocument1: {
    title: _faker2.default.company.catchPhrase(),
    content: _faker2.default.lorem.paragraph(),
    access: 'public',
    userId: 2
  },
  publicDocument2: {
    title: _faker2.default.company.catchPhrase(),
    content: _faker2.default.lorem.paragraph(),
    access: 'public',
    userId: 1
  },
  publicDocument3: {
    title: 'GOT',
    content: 'All men must die',
    userId: 2
  },
  privateDocument1: {
    title: _faker2.default.company.catchPhrase(),
    content: _faker2.default.lorem.paragraph(),
    access: 'private',
    userId: 1
  },
  privateDocument2: {
    title: 'Game of Thrones',
    content: _faker2.default.lorem.paragraph(),
    access: 'private',
    userId: 2
  },
  privateDocument3: {
    title: _faker2.default.company.catchPhrase(),
    content: _faker2.default.lorem.paragraph(),
    access: 'private',
    userId: 1
  },
  regularUserEdit: {
    username: 'Nodamin2',
    firstname: 'NoDaniel2',
    lastname: 'Amin2',
    email: 'nodaniel2@amin.com',
    password: 'feefeesho'
  },

  regularUser1edit: {
    username: 'damin2',
    firstname: 'Daniel2',
    lastname: 'Amin2',
    email: 'daniel2@amin.com',
    password: 'feefeesho'
  },

  regularUser1Admin: {
    username: 'damin',
    firstname: 'Daniel',
    lastname: 'Amin',
    email: 'daniel@amin.com',
    password: 'feefeesho',
    roleId: 1
  },
  regularUser4: {
    username: 'username',
    firstname: 'firstname',
    lastname: 'lastname',
    email: 'email@email.com',
    password: 'password',
    departmentId: 2
  },
  regularUser4Edit: {
    username: 'username',
    firstname: 'firstname',
    lastname: 'lastname',
    email: 'email@email.com',
    password: 'passwordModified'
  },
  regularUser5: {
    username: _faker2.default.internet.userName(),
    firstname: _faker2.default.name.firstName(),
    lastname: _faker2.default.name.lastName(),
    email: _faker2.default.internet.email(),
    password: _faker2.default.internet.password()
  },
  invalidUser: {
    username: null,
    firstname: _faker2.default.name.firstName(),
    lastname: _faker2.default.name.lastName(),
    email: 'a@a.com',
    password: _faker2.default.internet.password()
  },
  roleIdUser: {
    username: 'roleIdUser',
    firstname: _faker2.default.name.firstName(),
    lastname: _faker2.default.name.lastName(),
    email: _faker2.default.internet.email(),
    password: _faker2.default.internet.password(),
    roleId: 1
  },
  publicDocument4: {
    title: _faker2.default.company.catchPhrase(),
    content: _faker2.default.lorem.paragraph(),
    access: 'public',
    userId: 3
  },
  privateDocument4: {
    title: _faker2.default.company.catchPhrase(),
    content: _faker2.default.lorem.paragraph(),
    access: 'private',
    userId: 4
  },
  roleDocument1: {
    title: _faker2.default.company.catchPhrase(),
    content: _faker2.default.lorem.paragraph(),
    access: 'role',
    userId: 2
  },
  roleDocument2: {
    title: _faker2.default.company.catchPhrase(),
    content: _faker2.default.lorem.paragraph(),
    access: 'role',
    userId: 3
  },
  roleDocument3: {
    title: _faker2.default.company.catchPhrase(),
    content: _faker2.default.lorem.paragraph(),
    access: 'role',
    userId: 3
  },
  publicAccessType: {
    name: 'public'
  },
  privateAccessType: {
    name: 'private'
  },
  role: {
    name: 'role'
  }
};
exports.default = data;