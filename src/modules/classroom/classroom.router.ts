import express, { Router } from 'express';
var router = express.Router();
import ClassroomController from './classroom.controller';

const classroomController = new ClassroomController();

router.post('/', classroomController.create);

router.post('/registerclass', classroomController.registerClass);

router.get('/getall', classroomController.getAll);

router.get('/getclass/:userID', classroomController.getClassByUserID);

router.put('/:classID', classroomController.update);

router.delete('/:classID', classroomController.delete);

export default router;