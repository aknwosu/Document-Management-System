import express from 'express';
import Authentication from '../middlewares/authentication';
import UserController from '../controllers/users';

const router = express.Router();

router.route('/')
.get(UserController.getUser)
.post(UserController.createUser);

router.route('/:id')
.get(UserController.findUser)
.put(Authentication.requireValidToken, UserController.updateUser)
.delete(Authentication.requireValidToken, UserController.deleteUser);

router.route('/login')
.post(UserController.login);

router.route('/logout')
.post(Authentication.requireValidToken, UserController.logout);

router.route('/:id/documents')
.get(Authentication.requireValidToken, UserController.getUserDocument);

export default router;
