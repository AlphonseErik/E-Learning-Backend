import express from 'express';
import rateLimit from "express-rate-limit";

const createSignInLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 10, // start blocking after 5 requests
    message: "Too many accounts created from this IP, please try again after an hour"
});

var router = express.Router();

import AuthController from './auth.controller';
import { validatorBody } from '../../middlewares/index';
import { SignInValidatorSchema } from './validatorSchema/signin.validatorSchema';

const authController = new AuthController();

if (process.env.NODE_ENV === 'production') {
    router.post('/signin', createSignInLimiter, validatorBody(SignInValidatorSchema), authController.signIn);
} else {
    router.post('/signin', validatorBody(SignInValidatorSchema), authController.signIn);
}

router.post('/logout', authController.logout);
router.post('/verifytoken', authController.verifyToken);

export default router;