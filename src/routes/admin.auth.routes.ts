import { Router } from 'express';
import { signup, login } from '../controllers/admin.auth.controller';
import { validate } from '../validations/validateMiddleware';
import { signupSchema, loginSchema } from '../validations/userValidation';

const router = Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);

export default router;