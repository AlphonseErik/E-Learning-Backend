import BaseController from '../../commons/base/controller.base';
import ClassroomRepository from './classroom.repository';
import UserRepository from '../user/user.reponsitory';
import { BadRequestException } from '../../commons/errors/index';
import { ERR_MISSING_INPUT, ERR_CREATE_CLASS, CLASS_IS_ALREADY_EXIST, NO_PERMISSION, CLASS_NOT_FOUND, USER_ALREADY_EXIST, ERR_USER_NOT_FOUND, FULL_CLASS } from './classroom.message';

class ClassroomController extends BaseController {
    classroomRepository: ClassroomRepository;
    userRepository: UserRepository;
    constructor() {
        super();
        this.classroomRepository = new ClassroomRepository();
        this.userRepository = new UserRepository();
    }

    async create(req: any, res: any, next: any) {
        let { className, fullName } = req.body;
        try {
            if (!className) {
                throw new BadRequestException(ERR_MISSING_INPUT)
            }
            let checkClassExist = await this.classroomRepository.getClassByName(className);
            if (checkClassExist) {
                throw new BadRequestException(CLASS_IS_ALREADY_EXIST)
            }
            let userDetail = await this.userRepository.getUserByName(fullName, "-_id -__v -password");
            if (!userDetail) {
                throw new BadRequestException(ERR_USER_NOT_FOUND);
            }
            if (userDetail.type === 0) {
                throw new BadRequestException(NO_PERMISSION);
            }
            let createClass = await this.classroomRepository.create({ userName: userDetail.fullName, className });
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

    async registerClass(req: any, res: any, next: any) {
        let { userid: userID } = req.headers;
        let { classID } = req.body;
        try {
            let getUser = await this.userRepository.getById(userID);
            console.log(getUser)
            if (!getUser) {
                throw new BadRequestException(ERR_USER_NOT_FOUND)
            }
            let getClassByID = await this.classroomRepository.getClassByID(classID);
            let amountInClass = getClassByID?.amountAvailable;
            let checkStudentExist = getClassByID?.studentDetail;
            if (checkStudentExist) {
                if (checkStudentExist.length === amountInClass) {
                    throw new BadRequestException(FULL_CLASS);
                } else {
                    checkStudentExist.findIndex((index: any) => {
                        console.log(index)
                        if (index === userID) {
                            throw new BadRequestException(USER_ALREADY_EXIST);
                        }
                    })
                }
            }
            let registerClass = await this.classroomRepository.registerClass(classID, userID);
            console.log(registerClass)
            if (!registerClass) {
                throw new BadRequestException(CLASS_NOT_FOUND);
            }
            return res.json(
                registerClass
            )
        } catch (err) {
            next(err)
        }
    }

    async getAll(req: any, res: any, next: any) {
        try {
            let { limit, page } = req.params;
            let getClass = await this.classroomRepository.getAll(limit, page);
            return res.json(
                getClass
            )
        } catch (err) {
            next(err)
        }
    }

    async getClassByUserID(req: any, res: any, next: any) {
        try {
            let { userID } = req.params;
            let getClass = await this.classroomRepository.getClassByUserID(userID);
            if (!getClass) {
                throw new BadRequestException(CLASS_NOT_FOUND)
            }
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
                throw new BadRequestException(CLASS_NOT_FOUND);
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
                throw new BadRequestException(CLASS_NOT_FOUND);
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