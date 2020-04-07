import { ICreateClassroom } from './classroom.interface';
import ClassroomModel from './models/classroom.model';

class ClassroomRepository {
    constructor() {

    }

    async create(data: any): Promise<ICreateClassroom> {
        return ClassroomModel.create(data);
    }

    async getClassByName(className: String) {
        return ClassroomModel.findOne({
            className: className,
            isDeleted: false,
        }).select('-_id -__v -createdAt -updatedAt')
    }

    async getClassByUserID(userID: string = "", limit: number = 100, page: number = 1) {
        return ClassroomModel.paginate({
            isDeleted: false,
            userID,
        }, {
            sort: { createdAt: -1 },
            limit: Number(limit),
            page: Number(page),
            select: ""
        })
    }

    async getClassByID(classID: string) {
        return ClassroomModel.findOne({
            ID: classID,
            isDeleted: false,
        }).select('-_id -__v -createdAt -updatedAt')
    }

    async registerClass(classID: string, updateData: any): Promise<null | any> {
        const classroomUpdate = await ClassroomModel.updateOne({
            ID: classID,
            isDeleted: false,
        }, {
            $push: { studentDetail: updateData },
        });
        if (classroomUpdate.nModified > 0) {
            return true;
        }
        return false;
    }

    async update(userID: String, classID: String, updateData: any): Promise<null | any> {
        const classroomUpdate = await ClassroomModel.updateOne({
            userID: userID,
            ID: classID,
            isDeleted: false,
        }, {
            ...updateData,
        });
        if (classroomUpdate.nModified > 0) {
            return true;
        }
        return false;
    }
}

export default ClassroomRepository;