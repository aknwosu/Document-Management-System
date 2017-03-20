import jwt from 'jsonwebtoken';
import chai from 'chai';
import Request from 'supertest';
import dotenv from 'dotenv';
import db from '../models';
import app from '../../server';
import testFile from './testFile';

dotenv.config();
let userToken;
const expect = chai.expect;
const request = Request.agent(app);
const JWT_SECRET = process.env.SECRET;
// const userToken = jwt.sign({ id: '1', username: testFile.regularUser1edit.username, role: testFile.regularUser1edit.roleId }, JWT_SECRET);
// const badToken = jwt.sign({ id: '1', username: userFixtures[1].username, role: roleData[userFixtures[1].roleId] }, 'WRONG_SECRET');

//const adminToken = jwt.sign({ id: '1', username: testFile.adminUser1.username, role: testFile.adminUser1.roleId }, JWT_SECRET);
let adminToken;
const regularuser4 = testFile.regularUser4;
const regularUser = testFile.regularUser1;
const regularUser2 = testFile.regularUser1edit;
const adminUser = testFile.adminUser1;
const regularUser5 = testFile.regularUser5;
const roleIdUser = testFile.roleIdUser;

describe('Users', () => {
  before((done) => {
    db.Users.bulkCreate([regularUser2, regularUser])
    .then(() => {
      done();
    });
  });
  after((done) => {
    db.Users.sync({ force: true })
    .then(() => {
      done();
    });
  });

  it('should successfully create a user',
   (done) => {
     request.post('/users').send(adminUser)
    .end((error, response) => {
      adminToken = response.body.token;
      expect(response.status).to.equal(201);
      done();
    });
   });

  it('should allow only unique users to be created', (done) => {
    request.post('/users').send(regularUser2)
    .end((error, response) => {
      expect(response.status).to.equal(409);
      done();
    });
  });

  it('should not let users create admin users',
    (done) => {
      request.post('/users').send(roleIdUser)
      .end((error, response) => {
        adminToken = response.body.token;
        expect(response.status).to.equal(401);
        done();
      });
    });

  it('Should not return a password to the user', (done) => {
    request.post('/users').send(regularuser4)
    .end((error, response) => {
      expect(response.body.user.password).to.equal(undefined);
      done();
    });
  });

  it('Should log in users with the right password', (done) => {
    request.post('/users/login').send({
      email: regularuser4.email,
      password: regularuser4.password })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        done();
      });
  });

  it('Should not log in users with the wrong password', (done) => {
    request.post('/users/login').send({
      email: regularuser4.email,
      password: 'notAPassword' })
      .end((error, response) => {
        expect(response.status).to.equal(500);
        done();
      });
  });

  it('should return status code 400 for incorrect input', (done) => {
    request.post('/users')
        .send({})
        .end((error, response) => {
          expect(response.status).to.equal(400);
          done();
        });
  });

  it('should successfully search for one user', (done) => {
    request.get('/users/2')
    .set('authorization', adminToken)
    .end((error, response) => {
      expect(response.status).to.equal(200);
      done();
    });
  });

  it('should successfully get all users',
   (done) => {
     request.get('/users').send(adminUser)
      .set('authorization', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
   });

  it('should require a token to get all users',
   (done) => {
     request.get('/users').send(adminUser)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
   });

  it('Role Id for regular users should be 2',
      (done) => {
        request.get('/users/2').set('authorization', adminToken)
          .end((error, response) => {
            expect(response.body.msg.roleId).to.equal(2);
            done();
          });
      });

  it('should allow admin update a user', (done) => {
    request.put('/users/3')
      .send({ firstname: 'Dannie' })
      .set('authorization', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should allow owners update their details', (done) => {
    request.post('/users').send(regularUser5)
    .then((response) => {
      userToken = response.body.token;
      request.put('/users/6')
      .set('authorization', userToken)
      .send({ firstname: 'Mannie' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
  });

  it('Should not allow a regular user to update another user', (done) => {
    
  });

  it('should delete a user', (done) => {
    request.delete('/users/5')
      .set('authorization', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(204);
        done();
      });
  });
});
