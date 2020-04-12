import BaseController from '../../commons/base/controller.base';
import TimetableRepository from './timetable.repository';
import UserRepository from '../user/user.reponsitory';
import { BadRequestException } from '../../commons/errors/index'
import { ERR_MISSING_INPUT, ERR_CREATE_SCHEDULE, ERR_USER_NOT_FOUND, ERR_UPDATE } from './timetable.message';
import { NO_PERMISSION } from '../../commons/errorMessage/index'

class TimetableController extends BaseController {
    timetableRepository: TimetableRepository;
    userRepository: UserRepository;
    constructor() {
        super();
        this.timetableRepository = new TimetableRepository();
        this.userRepository = new UserRepository();
    }

    async create(req: any, res: any, next: any) {
        try {
            let { userid: userID } = req.headers;
            let { schedule, teacherName } = req.body;
            if (!teacherName) {
                throw new BadRequestException(ERR_MISSING_INPUT);
            }
            let getTeacherID = await this.userRepository.getUserByName(teacherName, { type: 1 });
            if (!getTeacherID) {
                throw new BadRequestException()
            };
            let createSchedule = await this.timetableRepository.create({
                userID,
                teacherID: getTeacherID.ID,
                schedule,
            })
            if (!createSchedule) {
                throw new BadRequestException(ERR_CREATE_SCHEDULE)
            }
            return res.json(
                createSchedule
            )
        } catch (err) {
            next(err)
        }
    }

    async getUserSchedule(req: any, res: any, next: any) {
        let { userid: userID } = req.headers;
        try {
            if (!userID) {
                throw new BadRequestException(ERR_MISSING_INPUT);
            }
            let getScheduleByUserID = await this.timetableRepository.getList(userID);
            if (!getScheduleByUserID) {
                throw new BadRequestException(ERR_USER_NOT_FOUND);
            }
            return res.json(
                getScheduleByUserID
            );
        } catch (err) {
            next(err)
        }
    }

    async update(req: any, res: any, next: any) {
        let { userid: userID } = req.headers;
        let { scheduleid } = req.params;
        try {
            if (!userID) {
                throw new BadRequestException(ERR_MISSING_INPUT);
            }
            let getUserByID = await this.userRepository.getById(userID, "-__v -id -createdAt -updatedAt");
            if (!getUserByID) {
                throw new BadRequestException(ERR_USER_NOT_FOUND);
            }
            if (getUserByID.type !== 0) {
                if (getUserByID.isSuperAdmin) {
                    let update = await this.timetableRepository.update(userID, scheduleid, req.body);
                    if (!update) {
                        throw new BadRequestException(ERR_UPDATE);
                    }
                    return res.json(
                        update
                    )
                }
                throw new BadRequestException(NO_PERMISSION);
            }
            throw new BadRequestException(NO_PERMISSION);
        } catch (err) {
            next(err)
        }
    }

    async delete(req: any, res: any, next: any) {
        let { userid: userID } = req.headers;
        let { scheduleid } = req.params;
        try {
            if (!userID) {
                throw new BadRequestException(ERR_MISSING_INPUT);
            }
            let getUserByID = await this.userRepository.getById(userID, "-__v -id -createdAt -updatedAt");
            if (!getUserByID) {
                throw new BadRequestException(ERR_USER_NOT_FOUND);
            }
            if (getUserByID.type !== 0) {
                if (getUserByID.isSuperAdmin) {
                    let update = await this.timetableRepository.update(userID, scheduleid, { isDeleted: true });
                    if (!update) {
                        throw new BadRequestException(ERR_UPDATE);
                    }
                    return res.json(
                        update
                    )
                }
                throw new BadRequestException(NO_PERMISSION);
            }
            throw new BadRequestException(NO_PERMISSION);
        } catch (err) {
            next(err)
        }
    }
}

export default TimetableController;