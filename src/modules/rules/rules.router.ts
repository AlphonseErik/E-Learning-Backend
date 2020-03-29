import express from 'express';

import RuleController from './rules.controller';

const ruleController = new RuleController();
var router = express.Router();
router.get('/', ruleController.getList);

export default router;