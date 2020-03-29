import express from 'express';

import UserController from './user.controller';

const userController = new UserController();

var router = express.Router();

router.post('/register', userController.register);

export default router;