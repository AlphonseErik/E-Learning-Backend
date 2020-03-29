import BaseController from '../../commons/base/controller.base';
import RuleRepository from './rules.repository';

class RuleController extends BaseController {
    ruleRepository: RuleRepository;
    constructor() {
        super();
        this.ruleRepository = new RuleRepository();
    }

    async getList(req: any, res: any, next: any) {
        try {
            const rules = await this.ruleRepository.getAll();
            res.json(rules);
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
}

export default RuleController;