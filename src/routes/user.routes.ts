import { Router } from 'express';
import { listUsers, deleteUser } from '../controllers/superadmin.user.controller';
import { superAdminAuth } from '../middleware/superAdminAuth';
import { validate } from '../validations/validateMiddleware';
import { deleteUserSchema } from '../validations/superAdminValidations';

const router = Router();

router.get('/', superAdminAuth, listUsers);
router.delete('/:userId', superAdminAuth, validate(deleteUserSchema), deleteUser);

export default router;