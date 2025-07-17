import { Router } from 'express';
import { getJobs, applyJob } from '../controllers/user.job.controller';
import { authMiddleware } from '../middleware/auth';
import { validate } from '../validations/validateMiddleware';
import { applyJobSchema } from '../validations/userValidation';

const router = Router();

router.get('/', authMiddleware, getJobs);
router.post('/apply', authMiddleware, validate(applyJobSchema), applyJob);

export default router;