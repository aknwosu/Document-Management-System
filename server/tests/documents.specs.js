import jwt from 'jsonwebtoken';
import chai from 'chai';
import Request from 'supertest';
import dotenv from 'dotenv';
import db from '../models';
import app from '../../server';
import testFile from './testFile';

dotenv.config();

const expect = chai.expect;
const request = Request.agent(app);
const JWT_SECRET = process.env.SECRET;
const adminToken = jwt.sign({ id: '1',
  username: testFile.adminUser1.username,
  roleId: testFile.adminUser1.roleId }, JWT_SECRET);
const regularUserToken = jwt.sign({ id: '1', username: testFile.regularUserEdit.username, roleId: testFile.regularUserEdit.roleId }, JWT_SECRET);


const regularUserEdit = testFile.regularUserEdit;
const regularUserOne = testFile.regularUser1;
const regularUserTwo = testFile.regularUser2;
const docAdminUser = testFile.adminUser2;
const publicDocument1 = testFile.publicDocument1;
const publicDocument2 = testFile.publicDocument2;
const privateDocument1 = testFile.privateDocument1;
let docAdminUserToken, regularUserOneToken;

describe('Documents', () => {
  before((done) => {
    db.sequelize.sync({ force: true })
    .then(() => {
      done();
    });
  });
  before((done) => {
    db.Roles.bulkCreate([testFile.adminRole, testFile.userRole])
    .then(() => db.Users.bulkCreate([
      docAdminUser,
      regularUserOne,
      regularUserTwo
    ], { individualHooks: true }))
    .then(() => db.Documents.bulkCreate([publicDocument1, privateDocument1]))
    .then(() => {
      request.post('/users/login')
        .send(docAdminUser)
        .end((error, response) => {
          docAdminUserToken = response.body.token;
          request.post('/users/login')
            .send(regularUserOne)
            .end((err, res) => {
              regularUserOneToken = res.body.token;
              done();
            });
        });
    });
  });

  describe('Create Documents', () => {
    it('should create a document', (done) => {
      request.post('/documents')
      .set('authorization', regularUserToken)
      .send(publicDocument2)
      .end((error, response) => {
        expect(response.status).to.equal(201);
        done();
      });
    });

    it('should fetch all documents', (done) => {
      request.post('/users').send(regularUserEdit)
      .then(() => {
        request.get('/documents')
        .set('authorization', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
      });
    });

    it('should update documents', (done) => {
      request.put('/documents/2')
      .send({ title: 'new title', content: 'new doc content' })
      .set('authorization', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });

    it('should delete a document', (done) => {
      request.delete('/documents/1')
      .send(docAdminUser)
      .set('authorization', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
  });
});

