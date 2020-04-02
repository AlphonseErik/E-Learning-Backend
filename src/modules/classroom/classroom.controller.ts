import BaseController from '../../commons/base/controller.base';
import ClassroomRepository from './classroom.repository';
import UserRepository from '../user/user.reponsitory';
import { BadRequestException } from '../../commons/errors/index';
import { ERR_MISSING_INPUT, ERR_CREATE_CLASS, CLASS_IS_ALREADY_EXIST, ERR_DELETE_CLASS, ERR_UPDATE_CLASS, NO_PERMISSION } from './classroom.message';

class ClassroomController extends BaseController {
    classroomRepository: ClassroomRepository;
    userRepository: UserRepository;
    constructor() {
        super();
        this.classroomRepository = new ClassroomRepository();
        this.userRepository = new UserRepository();
    }

    async create(req: any, res: any, next: any) {
        let { userid: userID } = req.headers;
        let { className } = req.body;
        try {
            if (!userID || !className) {
                throw new BadRequestException(ERR_MISSING_INPUT)
            }
            let checkClassExist = await this.classroomRepository.getClassByName(className);
            if (checkClassExist) {
                throw new BadRequestException(CLASS_IS_ALREADY_EXIST)
            }
            let userDetail = await this.userRepository.getById(userID);
            console.log(userDetail);
            if (userDetail.type === 0) {
                throw new BadRequestException(NO_PERMISSION);
            }
            let createClass = await this.classroomRepository.create({ userID, userName: userDetail.fullName, className });
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

    async getClassByUserID(req: any, res: any, next: any) {
        try {
            let { userID } = req.query;
            let getClass = await this.classroomRepository.getClassByUserID(userID);
            return res.json(
                getClass
            )
        } catch (err) {
            next(err)
        }
    }

    async update(req: any, res: any, next: any) {
        try {
            let { userid: userID } = req.headers;
            let { classID } = req.params;
            let { data } = req.body;
            if (!userID || !classID) {
                throw new BadRequestException(ERR_MISSING_INPUT)
            }
            let updateData = await this.classroomRepository.update(userID, classID, data);
            if (!updateData) {
                throw new BadRequestException(ERR_UPDATE_CLASS);
            }
            return res.json({
                updateData
            })
        } catch (err) {
            next(err)
        }
    }

    async delete(req: any, res: any, next: any) {
        try {
            let { userid: userID } = req.headers;
            let { classID } = req.params;
            if (!userID || !classID) {
                throw new BadRequestException(ERR_MISSING_INPUT)
            }
            let deleteClass = await this.classroomRepository.update(userID, classID, { isDelete: true });
            if (!deleteClass) {
                throw new BadRequestException(ERR_DELETE_CLASS);
            }
            return res.json({
                isDelete: true
            })
        } catch (err) {
            next(err)
        }
    }
}

export default ClassroomController;