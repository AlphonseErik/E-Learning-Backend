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
            className,
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

    async update(userID: String, classID: String, updateData: any) {
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