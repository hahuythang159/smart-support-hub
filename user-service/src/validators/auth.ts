import { body } from 'express-validator';

export const validateRegister = [
  body('email').trim().isEmail().withMessage('Invalid email'),
  body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

export const validateLogin = [
  body('email').trim().notEmpty().withMessage('Email is required'),
  body('password').trim().notEmpty().withMessage('Password is required'),
];
