import { Router } from 'express';
import { scheduleInterview } from '../controllers/admin.interview.controller';
import { adminAuth } from '../middleware/adminAuth';
import { validate } from '../validations/validateMiddleware';
import { scheduleInterviewSchema } from '../validations/adminValidation';

const router = Router();

router.post('/', adminAuth, validate(scheduleInterviewSchema), scheduleInterview);

export default router;