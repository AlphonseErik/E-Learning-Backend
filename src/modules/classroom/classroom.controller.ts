import BaseController from '../../commons/base/controller.base';
import ClassroomRepository from './classroom.repository';
import { BadRequestException } from '../../commons/errors/index';
import { ERR_MISSING_INPUT, ERR_CREATE_CLASS } from './classroom.message';

class ClassroomController extends BaseController {
    classroomRepository: ClassroomRepository;
    constructor() {
        super();
        this.classroomRepository = new ClassroomRepository();
    }

    async create(req: any, res: any, next: any) {
        let { userID } = req.headers;
        let { className } = req.body;
        try {
            if (!userID || !className) {
                throw new BadRequestException(ERR_MISSING_INPUT)
            }
            let createClass = await this.classroomRepository.create({ userID, className });
            if (!createClass) {
                throw new BadRequestException(ERR_CREATE_CLASS);
            }
            return res.json(
                createClass
            )
        } catch (err) {
            next(err)
        }
    }
}

export default ClassroomController;