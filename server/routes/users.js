import express from 'express';
import Authentication from '../middlewares/authentication';
import UserController from '../controllers/users';

const router = express.Router();

router.route('/')
.post(UserController.createUser)
.get(Authentication.requireValidToken,
Authentication.validUser, UserController.getUsers);

router.route('/createAdminUser')
.post(UserController.createAdminUser);


router.route('/:id')
.get(Authentication.requireValidToken,
Authentication.validUser, UserController.findUser)
.put(Authentication.requireValidToken,
Authentication.validUser,
Authentication.isOwnerOrAdmin, UserController.updateUser)
.delete(Authentication.requireValidToken,
Authentication.isAdmin, UserController.deleteUser);

router.route('/login')
.post(UserController.login);

router.route('/logout')
.post(UserController.logout);

router.route('/:id/documents')
.get(Authentication.requireValidToken,
Authentication.validUser,
UserController.getUserDocuments);

export default router;
