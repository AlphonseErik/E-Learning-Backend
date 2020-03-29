import express, { Router } from 'express';
var router = express.Router();
import ClassroomController from './classroom.controller';

const classroomController = new ClassroomController();

router.post('/', classroomController.create);

export default router;