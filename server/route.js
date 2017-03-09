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

// router.post('/documents/', DocumentController.createDoc);

// router.get('/documents/', DocumentController.findDoc);

// router.get('/documents/:id', DocumentController.matchingDoc);

// router.put('/documents/:id', DocumentController.updateDoc);

// router.delete('/documents/:id', DocumentController.deleteDoc);

// router.get('/users/:id/documents/', UserController.userDoc);

module.exports = router;