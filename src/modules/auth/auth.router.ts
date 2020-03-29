import express from 'express';
var router = express.Router();
import AuthController from './auth.controller';
import { validatorBody, verifyAccessToken } from '../../middlewares';
import { SignInValidatorSchema } from './validatorSchema/signIn.validatorSchema';

const authController = new AuthController();

router.post('/signin', verifyAccessToken(), validatorBody(SignInValidatorSchema), authController.signIn);
router.post('/logout', authController.logout);
router.post('/verifytoken', authController.verifyToken);

export default router;