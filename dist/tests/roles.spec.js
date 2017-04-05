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

var rolesAdminUserToken = void 0,
    rolesRegularUserToken = void 0,
    rolesRegularUserToken2 = void 0;

describe('Roles', function () {
  before(function (done) {
    _models2.default.sequelize.sync({ force: true }).then(function () {
      done();
    });
  });

  before(function (done) {
    _models2.default.Roles.bulkCreate([_testFile2.default.adminRole, _testFile2.default.userRole]).then(function () {
      return _models2.default.Users.bulkCreate([_testFile2.default.adminUser, _testFile2.default.regularUser], { individualHooks: true });
    }).then(function () {
      request.post('/users/login').send(_testFile2.default.adminUser).end(function (error, response) {
        rolesAdminUserToken = response.body.token;
        request.post('/users/login').send(_testFile2.default.regularUser).end(function (err, res) {
          rolesRegularUserToken = res.body.token;
          done();
        });
      });
    });
  });

  describe('Create Roles', function () {
    it('should create a role', function (done) {
      request.post('/roles').send(_testFile2.default.newRole).set('authorization', rolesAdminUserToken).end(function (error, response) {
        expect(response.status).to.equal(201);
        done();
      });
    });

    it('should catch errors while creating role', function (done) {
      request.post('/roles').send(_testFile2.default.xyz).set('authorization', rolesAdminUserToken).end(function (error, response) {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it('should check if a role already exists', function (done) {
      request.post('/roles').send(_testFile2.default.userRole).set('authorization', rolesAdminUserToken).end(function (error, response) {
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Role already exists');
        done();
      });
    });
  });

  describe('Get roles', function () {
    it('should return all roles to the admin', function (done) {
      request.get('/roles').set('authorization', rolesAdminUserToken).end(function (error, response) {
        expect(response.status).to.equal(200);
        done();
      });
    });

    it('should not return all roles to a non admin', function (done) {
      request.post('/users').send(_testFile2.default.regularUser2).then(function (newRoleUser) {
        rolesRegularUserToken2 = newRoleUser.body.token;
        request.get('/roles').set('authorization', newRoleUser.body.token).end(function (error, response) {
          expect(response.status).to.equal(403);
          done();
        });
      });
    });

    it('should return a specic role to the admin', function (done) {
      request.get('/roles/2').set('authorization', rolesAdminUserToken).end(function (error, response) {
        expect(response.status).to.equal(200);
        done();
      });
    });

    it('should not return a specic role to users', function (done) {
      request.get('/roles/2').set('authorization', rolesRegularUserToken2).end(function (error, response) {
        expect(response.status).to.equal(403);
        done();
      });
    });

    it('should fail if role does not exist', function (done) {
      request.get('/roles/9').set('authorization', rolesAdminUserToken).end(function (error, response) {
        expect(response.status).to.equal(404);
        done();
      });
    });
  });

  describe('Update role', function () {
    it('should let the admin update a specified role', function (done) {
      _models2.default.Roles.create({
        title: 'isssaRole',
        createdAt: new Date(),
        updatedAt: new Date()
      }).then(function (role) {
        request.put('/roles/' + role.id).set('authorization', rolesAdminUserToken).send({ title: 'issANewTitle' }).end(function (error, response) {
          expect(response.status).to.equal(200);
          expect(response.body.title).to.equal('issANewTitle');
          done();
        });
      });
    });

    it('should not let users update roles', function (done) {
      request.put('/roles/5').set('authorization', rolesRegularUserToken2).send({ title: 'Not allowed to be a title' }).end(function (error, response) {
        expect(response.status).to.equal(403);
        done();
      });
    });

    it('should fail to update role if title already exists', function (done) {
      request.put('/roles/5').set('authorization', rolesAdminUserToken).send({ title: 'user' }).end(function (error, response) {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it('should fail to update if the role does not exist', function (done) {
      request.put('/roles/xyz').set('authorization', rolesAdminUserToken).send({ title: 'user' }).end(function (error, response) {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it('should catch errors', function (done) {
      request.put('/roles/all').set('authorization', rolesAdminUserToken).send({ title: null }).end(function (error, response) {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it('should catch errors', function (done) {
      request.put('/roles').set('authorization', rolesAdminUserToken).send({ title: 'user' }).end(function (error, response) {
        expect(response.status).to.equal(404);
        done();
      });
    });
  });

  describe('delete roles', function () {
    it('should delete a specified role', function (done) {
      request.delete('/roles/4').set('authorization', rolesAdminUserToken).end(function (error, response) {
        expect(response.status).to.equal(200);
        done();
      });
    });

    it('should not delete the admin role', function (done) {
      request.delete('/roles/1').set('authorization', rolesAdminUserToken).end(function (error, response) {
        expect(response.status).to.equal(403);
        expect(response.body.message).to.equal('You cannot delete the admin role');
        done();
      });
    });

    it('should not let users delete roles', function (done) {
      request.delete('/roles/3').set('authorization', rolesRegularUserToken2).end(function (error, response) {
        expect(response.status).to.equal(403);
        expect(response.body.message).to.equal('You need to be an admin to use this resource.');
        done();
      });
    });

    it('should not let users delete roles', function (done) {
      request.delete('/roles/x').set('authorization', rolesAdminUserToken).end(function (error, response) {
        expect(response.status).to.equal(404);
        done();
      });
    });
  });
});