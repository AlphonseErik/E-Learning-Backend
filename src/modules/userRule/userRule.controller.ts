import uuid from 'uuid';
import BaseController from '../../commons/base/controller.base';
import UserRuleRepository from './userRule.repository';
import RuleRepository from '../rules/rules.repository';
import _ from 'lodash';
import { BadRequestException } from '../../commons/errors';
import { RULE_NOT_EXIST_IN_LIST_RULE } from './userRule.message';

class UserRuleController extends BaseController {
    userRuleRepository: UserRuleRepository;
    ruleRepository: RuleRepository;
    constructor() {
        super();
        this.userRuleRepository = new UserRuleRepository();
        this.ruleRepository = new RuleRepository();

    }

    async update(req: any, res: any, next: any) {
        try {
            let { userID, name } = req.body;
            let rules = await this.ruleRepository.getAll();
            let ruleNotExist = rules.indexOf(name);
            if (ruleNotExist < 0) {
                throw new BadRequestException(RULE_NOT_EXIST_IN_LIST_RULE)
            }
            let list = await this.userRuleRepository.getUserRuleByData({ userID, name })
            if (list.length > 0) {
                let create = await this.userRuleRepository.update(list[0].ID, req.body);
                res.json(create)
            } else {
                req.body.ID = uuid.v1();
                let create = await this.userRuleRepository.create(req.body);
                res.json(create)
            }
        } catch (error) {
            next(error);
        }
    }

    async updateRuleSubAcount(req: any, res: any, next: any) {
        try {
            let { userID, name } = req.body;
            let rules = await this.ruleRepository.getSubAccount();
            let ruleNotExist = rules.indexOf(name);
            if (ruleNotExist < 0) {
                throw new BadRequestException(RULE_NOT_EXIST_IN_LIST_RULE)
            }
            let list = await this.userRuleRepository.getUserRuleByData({ userID, name })
            if (list.length > 0) {
                let create = await this.userRuleRepository.update(list[0].ID, req.body);
                res.json(create)
            } else {
                req.body.ID = uuid.v1();
                let create = await this.userRuleRepository.create(req.body);
                res.json(create)
            }
        } catch (error) {
            next(error);
        }
    }

    async getRuleByUser(req: any, res: any, next: any) {
        try {
            let { userID } = req.params;
            let list = await this.userRuleRepository.getUserRuleByData({ userID })
            res.json(list)
        } catch (error) {
            next(error);
        }
    }


}

export default UserRuleController;