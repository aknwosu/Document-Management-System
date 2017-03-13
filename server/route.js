const express = require('express');

const router = express.Router();


const DocumentController = require('./controllers/documents');
const UserController = require('./controllers/users');

router.post('/users/login', UserController.login);

router.post('/users/logout', UserController.logout);

router.post('/users/', UserController.createUser);

router.get('/users/', UserController.getUser);

router.get('/users/:id', UserController.findUser);

router.put('/users/:id', UserController.updateUser);

router.delete('/users/:id', UserController.deleteUser);

router.post('/documents/', DocumentController.createDocument);

router.get('/documents/', DocumentController.getDocument);

router.get('/documents/:id', DocumentController.findDocument);

router.put('/documents/:id', DocumentController.updateDocument);

router.delete('/documents/:id', DocumentController.deleteDocument);

router.get('/users/:id/documents/', UserController.getUserDocument);

module.exports = router;
