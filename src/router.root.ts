import express from 'express';
var router = express.Router();
import UserRouter from './modules/user/user.router';

router.use('/users', UserRouter);

export default router;