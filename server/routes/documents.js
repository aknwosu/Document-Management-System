import express from 'express';
import Authentication from '../middlewares/authentication';
import DocumentController from '../controllers/documents';

const router = express.Router();

router.route('/')
.get(Authentication.requireValidToken, DocumentController.getDocument)
.post(Authentication.requireValidToken, DocumentController.createDocument);

router.route('/:id')
.get(Authentication.requireValidToken, DocumentController.findDocument)
.put(Authentication.requireValidToken, DocumentController.updateDocument)
.delete(Authentication.requireValidToken, DocumentController.deleteDocument);

export default router;
