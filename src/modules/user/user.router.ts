import express from 'express';

import UserController from './user.controller';
import { verifyAccessToken } from '../../middlewares';

const userController = new UserController();

var router = express.Router();

router.post('/register', userController.register);

router.post('/getprofile', userController.getProfile);

router.post('/search', verifyAccessToken, userController.search);

router.get('/getallstudent', userController.getAllStudent);

router.get('/getallteacher', userController.getAllTeacher);

router.delete('/:ID', userController.deletedUser);

export default router;