import express from 'express';
import Authentication from '../middlewares/authentication';
import RolesController from '../controllers/roles';

const router = express.Router();

router.route('/')
.post(Authentication.requireValidToken,
Authentication.isAdmin, RolesController.createRole)
.get(Authentication.requireValidToken,
Authentication.isAdmin, RolesController.fetchRoles);


router.route('/:id')
.get(Authentication.requireValidToken,
Authentication.isAdmin, RolesController.getRole)
.put(Authentication.requireValidToken,
Authentication.isAdmin, RolesController.updateRole)
.delete(Authentication.requireValidToken,
Authentication.isAdmin, RolesController.deleteRole);



export default router;
