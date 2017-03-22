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

let rolesAdminUserToken, rolesRegularUserToken, rolesRegularUser, rolesRegularUserToken2;

describe('Roles', () => {
  before((done) => {
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

  before((done) => {
    db.Users.bulkCreate([testFile.rolesAdminUser, testFile.rolesRegularUser], { individualHooks: true })
    .then(() => {
      request.post('/users/login')
      .send(testFile.rolesAdminUser)
      .end((error, response) => {
        rolesAdminUserToken = response.body.token;
        request.post('/users/login')
        .send(testFile.rolesRegularUser)
        .end((err, res) => {
          rolesRegularUser = res.body.user;
          rolesRegularUserToken = res.body.token;
          done();
        });
      });
    });
  });

  describe('Create Roles', () => {
    it('should create a role', (done) => {
      request.post('/roles').send(testFile.newRole)
      .set('authorization', rolesAdminUserToken)
      .end((error, response) => {
        expect(response.status).to.equal(201);
        done();
      });
    });

    it('should catch errors while creating role', (done) => {
      request.post('/roles').send(testFile.xyz)
      .set('authorization', rolesAdminUserToken)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it('should check if a role already exists', (done) => {
      request.post('/roles').send(testFile.userRole)
      .set('authorization', rolesAdminUserToken)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Role already exists');
        done();
      });
    });
  });

  
  describe('Get roles', () => {
    it('should return all roles to the admin', (done) => {
      request.get('/roles')
      .set('authorization', rolesAdminUserToken)
      .end((error, response) => {
        expect(response.status).to.equal(200);
        done();
      });
    });

    it('should not return all roles to a non admin', (done) => {
      request.post('/users').send(testFile.rolesRegularUser2)
      .then((newRoleUser) => {
        rolesRegularUserToken2 = newRoleUser.body.token;
        request.get('/roles')
      .set('authorization', newRoleUser.body.token)
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
      });
    });
    
    it('should return a specic role to the admin', (done) => {
      request.get('/roles/2')
      .set('authorization', rolesAdminUserToken)
      .end((error, response) => {
        expect(response.status).to.equal(200);
        done();
      });
    });

    it('should not return a specic role to users', (done) => {
      request.get('/roles/2')
      .set('authorization', rolesRegularUserToken2)
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });

    it('should fail if role does not exist', (done) => {
      request.get('/roles/9')
      .set('authorization', rolesAdminUserToken)
      .end((error, response) => {
        expect(response.status).to.equal(404);
        done();
      });
    });
  });

  describe('Update role', () => {
    it('should let the admin update a specified role', (done) => {
      db.Roles.create({
        title: 'isssaRole',
        createdAt: new Date(),
        updatedAt: new Date()
      }).then((role) => {
        request.put(`/roles/${role.id}`)
        .set('authorization', rolesAdminUserToken)
        .send({ title: 'issANewTitle' })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.title).to.equal('issANewTitle');
            done();
          });
      });
    });
    it('should not let users update roles', (done) => {
      request.put('/roles/5')
      .set('authorization', rolesRegularUserToken2)
      .send({ title: 'Not allowed to be a title' })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });
    it('should fail to update role if title already exists', (done) => {
      request.put('/roles/5')
      .set('authorization', rolesAdminUserToken)
      .send({ title: 'user' })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });
    it('should fail to update if the role does not exist', (done) => {
      request.put('/roles/xyz')
      .set('authorization', rolesAdminUserToken)
      .send({ title: 'user' })
      .end((error, response) => {
        expect(response.status).to.equal(404);
        done();
      });
    });
  });

  describe('delete roles', () => {
    it('should delete a specified role', (done) => {
      request.delete('/roles/4')
        .set('authorization', rolesAdminUserToken)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });

    it('should not delete the admin role', (done) => {
      request.delete('/roles/1')
        .set('authorization', rolesAdminUserToken)
        .end((error, response) => {
          expect(response.status).to.equal(403);
          expect(response.body.message).to.equal('You cannot delete the admin role');
          done();
        });
    });

    it('should not let users delete roles', (done) => {
      request.delete('/roles/3')
        .set('authorization', rolesRegularUserToken2)
        .end((error, response) => {
          expect(response.status).to.equal(403);
          expect(response.body.message).to.equal('You need to be an admin to use this resource.');
          done();
        });
    });

    it('should not let users delete roles', (done) => {
      request.delete('/roles/x')
        .set('authorization', rolesAdminUserToken)
        .end((error, response) => {
          expect(response.status).to.equal(404);
          done();
        });
    });
  });
});
