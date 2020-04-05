import express from 'express';
var router = express.Router();
import TimetableController from './timetable.controller';

const timetableController = new TimetableController();

router.post('/', timetableController.create);

router.put('/:scheduleid', timetableController.update);

router.delete('/:scheduleid', timetableController.delete);

export default router;