import express from 'express';
import UserRuleController from './userRule.controller';

const userRuleController = new UserRuleController();
var router = express.Router();

router.get('/:userID', userRuleController.getRuleByUser);

export default router;