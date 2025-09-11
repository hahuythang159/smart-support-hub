import express from 'express';
import { register, login } from '../controllers/auth.controller';
import { validateLogin, validateRegister } from '../validators/auth';
import { validate } from '../middleware/validate';
const router = express.Router();

router.post('/register', validateRegister, validate, register);
router.post('/login', validateLogin, validate, login);

export default router;
