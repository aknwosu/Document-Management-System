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
const adminToken = jwt.sign({ id: '1', username: testFile.adminUser1.username, roleId: testFile.adminUser1.roleId }, JWT_SECRET);

const regularUser = testFile.regularUser1;
const newRole = testFile.newRole;
const adminUser = testFile.adminUser1;

describe('Roles', () => {
  before((done) => {
    db.Users.bulkCreate([adminUser, regularUser])
    .then(() => {
      done();
    });
  });

  afterEach((done) => {
    db.Users.sync({ force: true })
    .then(() => {
      db.Roles.destroy({
        // don't delete the seeded roles
        where: {
          id: {
            $gt: 2
          }
        },
      }).then(() => {
        done();
      });
    });
  });

  it('should create a role', (done) => {
    request.post('/roles').send(newRole)
    .set('authorization', adminToken)
    .end((error, response) => {
      expect(response.status).to.equal(201);
      done();
    });
  });
 
  it('should get all roles', (done) => {
    request.get('/roles').send(adminUser)
    .set('authorization', adminToken)
    .end((error, response) => {
      expect(response.status).to.equal(200);
      done();
    });
  });

  it('should delete a specified role', (done) => {
    db.Roles.create({
      title: 'isssaRole',
      createdAt: new Date(),
      updatedAt: new Date()
    }).then((role) => {
      request.delete(`/roles/${role.id}`)
      .set('authorization', adminToken)
      .end((error, response) => {
        expect(response.status).to.equal(200);
        done();
      });
    });
  });

  it('should update a specified role', (done) => {
    db.Roles.create({
      title: 'isssaRole',
      createdAt: new Date(),
      updatedAt: new Date()
    }).then((role) => {
      request.put(`/roles/${role.id}`)
      .send({ title: 'issANewTitle' })
        .set('authorization', adminToken)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });
  });
});
