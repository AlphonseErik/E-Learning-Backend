import express from 'express';
var router = express.Router();
import AuthController from './auth.controller';

const authController = new AuthController();

router.post('/signin', authController.signIn);
router.post('/logout', authController.logout);
router.post('/verifytoken', authController.verifyToken);

export default router;