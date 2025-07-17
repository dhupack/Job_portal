import { Router } from 'express';
import { listAllJobs, deleteJob } from '../controllers/superadmin.job.controller';
import { superAdminAuth } from '../middleware/superAdminAuth';
import { validate } from '../validations/validateMiddleware';
import { deleteUserSchema } from '../validations/superAdminValidations';

const router = Router();

router.get('/', superAdminAuth, listAllJobs);
router.delete('/:jobId', superAdminAuth, validate(deleteUserSchema), deleteJob);

export default router;