import express from 'express';
var router = express.Router();
import AuthRouter from './modules/auth/auth.router';
import UserRouter from './modules/user/user.router';

router.use('/auth', AuthRouter)
router.use('/users', UserRouter);

export default router;