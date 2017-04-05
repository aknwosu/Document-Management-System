'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _server = require('../../server');

var _server2 = _interopRequireDefault(_server);

var _testFile = require('./testFile');

var _testFile2 = _interopRequireDefault(_testFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;
var request = _supertest2.default.agent(_server2.default);
var adminToken = void 0,
    regularUserToken = void 0,
    regularUserToken3 = void 0;

describe('Users', function () {
  before(function (done) {
    _models2.default.sequelize.sync({ force: true }).then(function () {
      done();
    });
  });
  before(function (done) {
    _models2.default.Roles.bulkCreate([_testFile2.default.adminRole, _testFile2.default.userRole]).then(function () {
      return _models2.default.Users.bulkCreate([_testFile2.default.adminUser, _testFile2.default.regularUser], { individualHooks: true });
    }).then(function () {
      return _models2.default.Documents.bulkCreate([_testFile2.default.publicDocument1, _testFile2.default.publicDocument2, _testFile2.default.publicDocument3, _testFile2.default.privateDocument1, _testFile2.default.privateDocument2, _testFile2.default.privateDocument3]);
    }).then(function () {
      request.post('/users/login').send(_testFile2.default.adminUser).end(function (error, response) {
        adminToken = response.body.token;
        request.post('/users/login').send(_testFile2.default.regularUser).end(function (err, res) {
          regularUserToken = res.body.token;
          done();
        });
      });
    });
  });
  describe('Create admin user', function () {
    it('should successfully create an admin', function (done) {
      request.post('/users/createAdminUser').send(_testFile2.default.adminUser1).set('authorization', adminToken).end(function (error, response) {
        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal(_testFile2.default.adminUser1.username + ' created');
        done();
      });
    });

    it('should allow only unique admins to be created', function (done) {
      request.post('/users/createAdminUser').send(_testFile2.default.adminUser1).set('authorization', adminToken).end(function (error, response) {
        expect(response.status).to.equal(409);
        expect(response.body.message).to.equal('User already exists');
        done();
      });
    });
  });

  describe('Create', function () {
    it('should successfully create a user', function (done) {
      request.post('/users').send(_testFile2.default.regularUser1).end(function (error, response) {
        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal('damin created');
        done();
      });
    });

    it('should allow only unique users to be created', function (done) {
      request.post('/users').send(_testFile2.default.regularUser1).end(function (error, response) {
        expect(response.status).to.equal(409);
        expect(response.body.message).to.equal('User already exists');
        done();
      });
    });

    it('should not let users create admin users', function (done) {
      request.post('/users').send(_testFile2.default.dontBeAdmin).end(function (error, response) {
        expect(response.status).to.equal(403);
        done();
      });
    });
    it('Should not return a password to the user', function (done) {
      request.post('/users').send(_testFile2.default.regularUser3).end(function (error, response) {
        regularUserToken3 = response.body.token;
        expect('password' in response.body.user).to.equal(false);
        done();
      });
    });
  });

  describe('login', function () {
    it('Should log in users with the right password', function (done) {
      request.post('/users/login').send({
        email: _testFile2.default.regularUser3.email,
        password: _testFile2.default.regularUser3.password }).end(function (error, response) {
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Logged in');
        done();
      });
    });

    it('Should not log in users with the wrong password', function (done) {
      request.post('/users/login').send({
        email: _testFile2.default.regularUser3.email,
        password: 'notAPassword' }).end(function (error, response) {
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Invalid username or password');
        done();
      });
    });
  });

  describe('Logout', function () {
    it('should logout users', function (done) {
      request.post('/users/logout').send(_testFile2.default.regularUser3).end(function (error, response) {
        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal('Logged out');
        done();
      });
    });
  });

  describe('Update', function () {
    it('should update user details', function (done) {
      request.put('/users/7').set('authorization', regularUserToken3).send({ firstname: 'Alibaba' }).end(function (error, response) {
        expect(response.status).to.equal(200);
        expect(response.body.message.firstname).to.equal('Alibaba');
        done();
      });
    });

    it('should check that a token is valid', function (done) {
      request.put('/users/7').set('authorization', 'justNotAToken').send({ firstname: 'Alibaba' }).end(function (error, response) {
        expect(response.status).to.equal(401);
        done();
      });
    });

    it('should check that a token is supplied', function (done) {
      request.put('/users/7').send({ firstname: 'Alibaba' }).end(function (error, response) {
        expect(response.status).to.equal(403);
        done();
      });
    });

    it('should not update non-existent users', function (done) {
      request.put('/users/99').set('authorization', adminToken).send({ firstname: 'Xyz' }).end(function (error, response) {
        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('Not found');
        done();
      });
    });

    it('should allow admins update a user', function (done) {
      request.put('/users/7').send({ firstname: 'Dannie' }).set('authorization', adminToken).end(function (err, res) {
        expect(res.status).to.equal(200);
        done();
      });
    });

    it('should allow owners update their details', function (done) {
      request.put('/users/7').set('authorization', regularUserToken3).send({ firstname: 'Mandy' }).end(function (err, res) {
        expect(res.status).to.equal(200);
        done();
      });
    });

    it('should handle errors', function (done) {
      request.put('/users/xyz').set('authorization', regularUserToken3).send({ firstname: 'mimi' }).end(function (error, response) {
        expect(response.status).to.equal(500);
        done();
      });
    });
  });

  describe('Get a user', function () {
    it('should fetch a user if requested by the owner', function (done) {
      request.get('/users/7').set('authorization', regularUserToken3).end(function (err, res) {
        expect(res.status).to.equal(200);
        done();
      });
    });

    it('should not get users if not requested by an admin or owner', function (done) {
      request.get('/users/7').set('authorization', regularUserToken).end(function (error, response) {
        expect(response.status).to.equal(403);
        done();
      });
    });

    it('should not return not found if user does not exist', function (done) {
      request.get('/users/99').set('authorization', adminToken).end(function (error, response) {
        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('Not found');
        done();
      });
    });

    it('should catch errors', function (done) {
      request.get('/users/xyz').set('authorization', adminToken).end(function (error, response) {
        expect(response.status).to.equal(500);
        done();
      });
    });
  });

  describe('Get a User', function () {
    it('should get details of a user', function (done) {
      request.get('/users/5').set('authorization', adminToken).end(function (err, res) {
        expect(res.status).to.equal(200);
        done();
      });
    });

    it('should find users based on search terms', function (done) {
      request.get('/search/users/?q=Cole').set('authorization', adminToken).end(function (error, response) {
        expect(response.status).to.equal(200);
        expect(response.body.message.username).to.equal('Cole');
        done();
      });
    });

    it('should check that a query string was input', function (done) {
      request.get('/search/users/?q=').set('authorization', adminToken).end(function (error, response) {
        expect(response.status).to.equal(404);
        done();
      });
    });

    it('should send a 404 if the user does not exist', function (done) {
      request.get('/users/99').set('authorization', adminToken).end(function (err, res) {
        expect(res.status).to.equal(404);
        done();
      });
    });

    it('should catch errors', function (done) {
      request.get('/users/xyz').set('authorization', adminToken).end(function (err, res) {
        expect(res.status).to.equal(500);
        done();
      });
    });
  });

  describe('Get Users', function () {
    it('should get details of all users', function (done) {
      request.get('/users').set('authorization', adminToken).end(function (err, res) {
        expect(res.status).to.equal(200);
        done();
      });
    });

    it('should should restrict details of users', function (done) {
      request.get('/users').set('authorization', regularUserToken).end(function (err, res) {
        expect(res.status).to.equal(200);
        done();
      });
    });

    it('should paginate the result of getting all users', function (done) {
      request.get('/users/?limit=4&offset=0').set('authorization', adminToken).end(function (err, res) {
        expect(res.body.pageData.total_count).to.equal(5);
        done();
      });
    });

    it('should catch errors', function (done) {
      request.get('/users/xyz').set('authorization', adminToken).end(function (err, res) {
        expect(res.status).to.equal(500);
        done();
      });
    });
  });

  describe('Delete', function () {
    it('should check that a user exists before trying to delete', function (done) {
      request.delete('/users/99').set('authorization', adminToken).end(function (err, res) {
        expect(res.status).to.equal(404);
        done();
      });
    });

    it('should delete a user', function (done) {
      request.delete('/users/5').set('authorization', adminToken).end(function (err, res) {
        expect(res.status).to.equal(204);
        done();
      });
    });

    it('should not let users delete other users', function (done) {
      request.delete('/users/7').set('authorization', regularUserToken3).end(function (err, res) {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('You need to be an admin to use this resource.');
        done();
      });
    });
  });

  describe('Get users document', function () {
    it('should retrieve specified documents', function (done) {
      request.get('/users/2/documents').set('authorization', regularUserToken).end(function (error, response) {
        expect(response.status).to.equal(200);
        done();
      });
    });

    it('should catch errors that may occur', function (done) {
      request.get('/users/9/documents').set('authorization', regularUserToken).end(function (error, response) {
        expect(response.status).to.equal(404);
        done();
      });
    });
  });
});