import chai from 'chai';
import Request from 'supertest';
import db from '../models';
import app from '../../server';
import testFile from './testFile';


const expect = chai.expect;
const request = Request.agent(app);

let docAdminToken, regularUserToken, regularUserToken1;

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
      testFile.adminUser,
      testFile.regularUser,
      testFile.regularUser1
    ], { individualHooks: true }))
    .then(() => db.Documents
    .bulkCreate([testFile.publicDocument1, testFile.privateDocument1]))
    .then(() => {
      request.post('/users/login')
        .send(testFile.adminUser)
        .end((error, response) => {
          docAdminToken = response.body.token;
          request.post('/users/login')
            .send(testFile.regularUser)
            .end((err, res) => {
              regularUserToken = res.body.token;
              request.post('/users/login')
            .send(testFile.regularUser1)
            .end((err, res) => {
              regularUserToken1 = res.body.token;
              done();
            });
            });
        });
    });
  });

  describe('Create Documents', () => {
    it('should create a document', (done) => {
      request.post('/documents')
      .set('authorization', regularUserToken)
      .send(testFile.publicDocument2)
      .end((error, response) => {
        expect(response.status).to.equal(201);
        expect(response.body.document.access).to.equal('public');
        done();
      });
    });

    it('should set the default access for documents to public', (done) => {
      request.post('/documents')
      .set('authorization', regularUserToken)
      .send(testFile.publicDocument3)
      .end((error, response) => {
        expect(response.status).to.equal(201);
        done();
      });
    });

    it('should catch errors', (done) => {
      request.post('/documents')
      .set('authorization', regularUserToken)
      .send(testFile.xyz)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });
  });

  describe('fetch documents', () => {
    it('should fetch all documents', (done) => {
      request.get('/documents')
        .set('authorization', docAdminToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('should fetch all documents for users', (done) => {
      request.get('/documents')
        .set('authorization', regularUserToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
  describe('get a single document', () => {
    it('should fetch a single document', (done) => {
      request.get('/documents/4')
        .set('authorization', docAdminToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('should check if documents exist before fetching', (done) => {
      request.get('/documents/99')
        .set('authorization', docAdminToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('should not return private documents of users', (done) => {
      request.get('/documents/2')
        .set('authorization', regularUserToken1)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('private document');
          done();
        });
    });

    it('should search for documents based on parameters', (done) => {
      request.get('/search/documents/?q=GOT')
      .set('authorization', docAdminToken)
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body.docs[0].title).to.equal('GOT');
        done();
      });
    });

    it('should search for documents based on parameters', (done) => {
      request.get('/search/documents/?q=')
      .set('authorization', docAdminToken)
      .end((error, response) => {
        expect(response.status).to.equal(404);
        done();
      });
    });

    it('should catch errors', (done) => {
      request.get('/documents/xyz')
        .set('authorization', regularUserToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe('update documents', () => {
    it('should catch errors', (done) => {
      request.put('/documents/9')
      .send({ title: 'new title', content: 'new doc content' })
      .set('authorization', docAdminToken)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });

    it('should update documents', (done) => {
      request.put('/documents/2')
      .send({ title: 'new title', content: 'new doc content' })
      .set('authorization', docAdminToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
  });

  describe('delete', () => {
    it('should check if a document exists before deleting it', (done) => {
      request.delete('/documents/99')
      .set('authorization', docAdminToken)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });

    it('should delete a document', (done) => {
      request.delete('/documents/1')
      .set('authorization', docAdminToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
  });
});
