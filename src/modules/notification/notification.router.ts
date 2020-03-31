import express from 'express';
import NotificationController from './notification.controller';

const notificationController = new NotificationController();
var router = express.Router();

router.post('/sendMail', notificationController.sendMail);

export default router;