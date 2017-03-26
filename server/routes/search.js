import express from 'express';
import Authentication from '../middlewares/authentication';
import DocumentController from '../controllers/documents';
import UserController from '../controllers/users';

const router = express.Router();


router.route('/users')
.get(Authentication.requireValidToken, UserController.searchUser);

router.route('/documents')
.get(Authentication.requireValidToken, DocumentController.searchDocument);

export default router;
