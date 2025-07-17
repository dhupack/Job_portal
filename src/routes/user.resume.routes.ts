import { Router } from 'express';
import { uploadResume } from '../controllers/user.resume.controller';
import { validate } from '../validations/validateMiddleware';
import { resumeSchema } from '../validations/userValidation';
import { authMiddleware } from '../middleware/auth';
import multer from 'multer';
const router = Router();
const upload = multer({ storage: multer.memoryStorage() });


router.post('/', authMiddleware, validate(resumeSchema), upload.single('resume'), uploadResume);

export default router;