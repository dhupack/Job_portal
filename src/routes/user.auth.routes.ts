import { Router } from 'express';
// import { signup, login } from '../controllers/auth.controller';
import{register,login} from '../controllers/user.auth.controller';
import { validate } from '../validations/validateMiddleware';
import { signupSchema, loginSchema } from '../validations/userValidation';

const router = Router();

router.post('/register', validate(signupSchema), register);
// router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);

export default router;