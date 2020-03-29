import express from 'express';
var router = express.Router();
import AuthRouter from './modules/auth/auth.router';
import RuleRouter from './modules/rules/rules.router';
import UserRouter from './modules/user/user.router';
import UserRuleRouter from './modules/userRule/userRule.router';
import ClassroomRouter from './modules/classroom/classroom.router';

router.use('/auth', AuthRouter);
router.use('/rules', RuleRouter);
router.use('/users', UserRouter);
router.use('/user/rules', UserRuleRouter);
router.use('/classrooms', ClassroomRouter);

export default router;