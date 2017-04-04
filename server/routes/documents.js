import express from 'express';
import Authentication from '../middlewares/authentication';
import DocumentController from '../controllers/documents';

const router = express.Router();

// Route to get and post documents for a user
router.route('/')
.get(Authentication.requireValidToken,
Authentication.validUser, DocumentController.getDocuments)
.post(Authentication.requireValidToken, DocumentController.createDocument);


router.route('/:id')
.get(Authentication.requireValidToken,
Authentication.validUser, DocumentController.findDocument)
.put(Authentication.requireValidToken,
Authentication.validUser, DocumentController.updateDocument)
.delete(Authentication.requireValidToken,
Authentication.isAdmin, DocumentController.deleteDocument);

export default router;
