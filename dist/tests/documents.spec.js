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

var docAdminToken = void 0,
    regularUserToken = void 0,
    regularUserToken1 = void 0;

describe('Documents', function () {
  before(function (done) {
    _models2.default.sequelize.sync({ force: true }).then(function () {
      done();
    });
  });
  before(function (done) {
    _models2.default.Roles.bulkCreate([_testFile2.default.adminRole, _testFile2.default.userRole]).then(function () {
      return _models2.default.Users.bulkCreate([_testFile2.default.adminUser, _testFile2.default.regularUser, _testFile2.default.regularUser1], { individualHooks: true });
    }).then(function () {
      return _models2.default.Documents.bulkCreate([_testFile2.default.publicDocument1, _testFile2.default.privateDocument1]);
    }).then(function () {
      request.post('/users/login').send(_testFile2.default.adminUser).end(function (error, response) {
        docAdminToken = response.body.token;
        request.post('/users/login').send(_testFile2.default.regularUser).end(function (err, res) {
          regularUserToken = res.body.token;
          request.post('/users/login').send(_testFile2.default.regularUser1).end(function (err, res) {
            regularUserToken1 = res.body.token;
            done();
          });
        });
      });
    });
  });

  describe('Create Documents', function () {
    it('should create a document', function (done) {
      request.post('/documents').set('authorization', regularUserToken).send(_testFile2.default.publicDocument2).end(function (error, response) {
        expect(response.status).to.equal(201);
        expect(response.body.document.access).to.equal('public');
        done();
      });
    });

    it('should set the default access for documents to public', function (done) {
      request.post('/documents').set('authorization', regularUserToken).send(_testFile2.default.publicDocument3).end(function (error, response) {
        expect(response.status).to.equal(201);
        done();
      });
    });

    it('should check that a token is valid', function (done) {
      request.post('/documents').set('authorization', ' ').send(_testFile2.default.publicDocument3).end(function (error, response) {
        expect(response.status).to.equal(403);
        done();
      });
    });

    it('should catch errors', function (done) {
      request.post('/documents').set('authorization', regularUserToken).send(_testFile2.default.xyz).end(function (error, response) {
        expect(response.status).to.equal(400);
        done();
      });
    });
  });

  describe('fetch documents', function () {
    it('should fetch all documents', function (done) {
      request.get('/documents').set('authorization', docAdminToken).end(function (err, res) {
        expect(res.status).to.equal(200);
        done();
      });
    });

    it('should fetch all documents for users', function (done) {
      request.get('/documents').set('authorization', regularUserToken).end(function (err, res) {
        expect(res.status).to.equal(200);
        done();
      });
    });
  });
  describe('get a single document', function () {
    it('should fetch a single document', function (done) {
      request.get('/documents/4').set('authorization', docAdminToken).end(function (err, res) {
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should check if documents exist before fetching', function (done) {
      request.get('/documents/99').set('authorization', docAdminToken).end(function (err, res) {
        expect(res.status).to.equal(404);
        done();
      });
    });

    it('should not return private documents of users', function (done) {
      request.get('/documents/2').set('authorization', regularUserToken1).end(function (err, res) {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('private document');
        done();
      });
    });

    it('should search for documents based on parameters', function (done) {
      request.get('/search/documents/?q=GOT').set('authorization', docAdminToken).end(function (error, response) {
        expect(response.status).to.equal(200);
        expect(response.body.docs[0].title).to.equal('GOT');
        done();
      });
    });

    it('should search for documents based on parameters', function (done) {
      request.get('/search/documents/?q=').set('authorization', docAdminToken).end(function (error, response) {
        expect(response.status).to.equal(404);
        done();
      });
    });

    it('should catch errors', function (done) {
      request.get('/documents/xyz').set('authorization', regularUserToken).end(function (err, res) {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('update documents', function () {
    it('should catch errors', function (done) {
      request.put('/documents/9').send({ title: 'new title', content: 'new doc content' }).set('authorization', docAdminToken).end(function (err, res) {
        expect(res.status).to.equal(404);
        done();
      });
    });

    it('should update documents', function (done) {
      request.put('/documents/2').send({ title: 'new title', content: 'new doc content' }).set('authorization', docAdminToken).end(function (err, res) {
        expect(res.status).to.equal(200);
        done();
      });
    });
  });

  describe('delete', function () {
    it('should check if a document exists before deleting it', function (done) {
      request.delete('/documents/99').set('authorization', docAdminToken).end(function (err, res) {
        expect(res.status).to.equal(404);
        done();
      });
    });

    it('should delete a document', function (done) {
      request.delete('/documents/1').set('authorization', docAdminToken).end(function (err, res) {
        expect(res.status).to.equal(200);
        done();
      });
    });
  });
});