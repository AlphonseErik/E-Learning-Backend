import express from 'express';
import {
    validatorBody,
    validatorParam,
    validatorQuery
} from '../../middlewares';

import UserController from './user.controller';

const userController = new UserController();

var router = express.Router();

router.post('/register', userController.register);

export default router;