import chai from 'chai';
import Request from 'supertest';
import db from '../models';
import app from '../../server';
import testFile from './testFile';

const expect = chai.expect;
const request = Request.agent(app);
let adminToken, regularUserToken, regularUserToken3;

describe('Users', () => {
  before((done) => {
    db.sequelize.sync({ force: true })
    .then(() => {
      done();
    });
  });
  before((done) => {
    db.Roles.bulkCreate([testFile.adminRole, testFile.userRole])
    .then(() => db.Users.bulkCreate([testFile.adminUser,
      testFile.regularUser], { individualHooks: true }))
        .then(() => db.Documents.bulkCreate([testFile.publicDocument1,
          testFile.publicDocument2, testFile.publicDocument3,
          testFile.privateDocument1, testFile.privateDocument2,
          testFile.privateDocument3]))
            .then(() => {
              request.post('/api/users/login')
                .send(testFile.adminUser)
                  .end((error, response) => {
                    adminToken = response.body.token;
                    request.post('/api/users/login')
                      .send(testFile.regularUser)
                        .end((err, res) => {
                          regularUserToken = res.body.token;
                          done();
                        });
                  });
            });
  });

  describe('Create admin user', () => {
    it('should successfully create an admin', (done) => {
      request.post('/api/users/createAdminUser').send(testFile.adminUser1)
        .set('authorization', adminToken)
          .end((error, response) => {
            expect(response.status).to.equal(201);
            expect(response.body.message)
              .to.equal(`${testFile.adminUser1.username} created`);
            done();
          });
    });

    it('should allow only unique admins to be created', (done) => {
      request.post('/api/users/createAdminUser').send(testFile.adminUser1)
        .set('authorization', adminToken)
          .end((error, response) => {
            expect(response.status).to.equal(409);
            expect(response.body.message).to.equal('User already exists');
            done();
          });
    });
  });

  describe('Create', () => {
    it('should successfully create a user', (done) => {
      request.post('/api/users').send(testFile.regularUser1)
        .end((error, response) => {
          expect(response.status).to.equal(201);
          expect(response.body.message).to.equal('damin created');
          done();
        });
    });

    it('should allow only unique users to be created', (done) => {
      request.post('/api/users').send(testFile.regularUser1)
        .end((error, response) => {
          expect(response.status).to.equal(409);
          expect(response.body.message).to.equal('This email already exists');
          done();
        });
    });

    it('should not let users create admin users', (done) => {
      request.post('/api/users').send(testFile.dontBeAdmin)
        .end((error, response) => {
          expect(response.status).to.equal(403);
          done();
        });
    });

    it('Should not return a password to the user', (done) => {
      request.post('/api/users').send(testFile.regularUser3)
        .end((error, response) => {
          regularUserToken3 = response.body.token;
          expect('password' in response.body.user).to.equal(false);
          done();
        });
    });
  });

  describe('login', () => {
    it('Should log in users with the right password', (done) => {
      request.post('/api/users/login').send({
        email: testFile.regularUser3.email,
        password: testFile.regularUser3.password })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal('Logged in');
            done();
          });
    });

    it('Should not log in users with the wrong password', (done) => {
      request.post('/api/users/login').send({
        email: testFile.regularUser3.email,
        password: 'notAPassword' })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message)
              .to.equal('Invalid username or password');
            done();
          });
    });
  });

  describe('Logout', () => {
    it('should logout users', (done) => {
      request.post('/api/users/logout')
        .send(testFile.regularUser3)
          .end((error, response) => {
            expect(response.status).to.equal(201);
            expect(response.body.message).to.equal('Logged out');
            done();
          });
    });
  });

  describe('Update', () => {
    it('should update user details', (done) => {
      request.put('/api/users/7')
        .set('authorization', regularUserToken3)
          .send({ firstname: 'Alibaba' })
            .end((error, response) => {
              expect(response.status).to.equal(200);
              expect(response.body.User.firstname).to.equal('Alibaba');
              done();
            });
    });

    it('should check that a token is valid', (done) => {
      request.put('/api/users/7')
        .set('authorization', 'justNotAToken')
          .send({ firstname: 'Alibaba' })
            .end((error, response) => {
              expect(response.status).to.equal(401);
              done();
            });
    });

    it('should check that a token is supplied', (done) => {
      request.put('/api/users/7')
        .send({ firstname: 'Alibaba' })
          .end((error, response) => {
            expect(response.status).to.equal(403);
            done();
          });
    });

    it('should not update non-existent users', (done) => {
      request.put('/api/users/99')
        .set('authorization', adminToken)
          .send({ firstname: 'Xyz' })
            .end((error, response) => {
              expect(response.status).to.equal(404);
              expect(response.body.message).to.equal('Not found');
              done();
            });
    });

    it('should allow admins update a user', (done) => {
      request.put('/api/users/7')
        .send({ firstname: 'Dannie' })
          .set('authorization', adminToken)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              done();
            });
    });

    it('should allow owners update their details', (done) => {
      request.put('/api/users/7')
        .set('authorization', regularUserToken3)
          .send({ firstname: 'Mandy' })
            .end((err, res) => {
              expect(res.status).to.equal(200);
              done();
            });
    });

    it('should not allow users update others details', (done) => {
      request.put('/api/users/7')
        .set('authorization', regularUserToken)
          .send({ firstname: 'Mandy' })
            .end((err, res) => {
              expect(res.status).to.equal(403);
              done();
            });
    });


    it('should handle errors', (done) => {
      request.put('/api/users/xyz')
        .set('authorization', adminToken)
          .send({ firstname: 'mimi' })
            .end((error, response) => {
              expect(response.status).to.equal(500);
              done();
            });
    });
  });

  describe('Get a user', () => {
    it('should fetch a user if requested by the owner', (done) => {
      request.get('/api/users/7')
        .set('authorization', regularUserToken3)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
    });

    it('should not get users if not requested by an admin or owner', (done) => {
      request.get('/api/users/7')
        .set('authorization', regularUserToken)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.user.firstname).to.equal(undefined);
            done();
          });
    });

    it('should not return not found if user does not exist', (done) => {
      request.get('/api/users/99')
        .set('authorization', adminToken)
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('Not found');
            done();
          });
    });

    it('should catch errors', (done) => {
      request.get('/api/users/xyz')
        .set('authorization', adminToken)
          .end((error, response) => {
            expect(response.status).to.equal(500);
            done();
          });
    });
  });

  describe('Get a User', () => {
    it('should get details of a user', (done) => {
      request.get('/api/users/5')
        .set('authorization', adminToken)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
    });

    it('should find users based on search terms', (done) => {
      request.get('/api/search/users/?q=Cole')
        .set('authorization', adminToken)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.user[0].username).to.equal('Cole');
            done();
          });
    });

    it('should check that a query string was input', (done) => {
      request.get('/api/search/users/?q=')
        .set('authorization', adminToken)
          .end((error, response) => {
            expect(response.status).to.equal(404);
            done();
          });
    });

    it('should send a 404 if the user does not exist', (done) => {
      request.get('/api/users/99')
        .set('authorization', adminToken)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
    });

    it('should catch errors', (done) => {
      request.get('/api/users/xyz')
        .set('authorization', adminToken)
          .end((err, res) => {
            expect(res.status).to.equal(500);
            done();
          });
    });
  });

  describe('Get Users', () => {
    it('should get details of all users', (done) => {
      request.get('/api/users')
        .set('authorization', adminToken)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
    });

    it('should should restrict details of users', (done) => {
      request.get('/api/users')
        .set('authorization', regularUserToken)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
    });

    it('should paginate the result of getting all users', (done) => {
      request.get('/api/users/?limit=4&offset=0')
        .set('authorization', adminToken)
          .end((err, res) => {
            expect(res.body.pageData.total_count).to.equal(5);
            done();
          });
    });

    it('should catch errors', (done) => {
      request.get('/api/users/xyz')
        .set('authorization', adminToken)
          .end((err, res) => {
            expect(res.status).to.equal(500);
            done();
          });
    });
  });

  describe('Delete', () => {
    it('should check that a user exists before trying to delete', (done) => {
      request.delete('/api/users/99')
        .set('authorization', adminToken)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
    });

    it('should delete a user', (done) => {
      request.delete('/api/users/5')
        .set('authorization', adminToken)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
    });

    it('should not let users delete other users', (done) => {
      request.delete('/api/users/7')
        .set('authorization', regularUserToken3)
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body.message)
              .to.equal('You need to be an admin to use this resource.');
            done();
          });
    });
  });

  describe('Get users document', () => {
    it('should retrieve specified documents', (done) => {
      request.get('/api/users/2/documents')
        .set('authorization', regularUserToken)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            done();
          });
    });

    it('should catch errors that may occur', (done) => {
      request.get('/api/users/9/documents')
        .set('authorization', regularUserToken)
          .end((error, response) => {
            expect(response.status).to.equal(404);
            done();
          });
    });
  });
});
