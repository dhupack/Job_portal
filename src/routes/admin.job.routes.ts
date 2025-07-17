import { Router } from 'express';
import { createJob, listJobs } from '../controllers/admin.job.controller';
import { adminAuth } from '../middleware/adminAuth';
import { validate } from '../validations/validateMiddleware';
import { createJobSchema } from '../validations/adminValidation';

const router = Router();

router.post('/', adminAuth, validate(createJobSchema), createJob);
router.get('/', adminAuth, listJobs);

export default router;