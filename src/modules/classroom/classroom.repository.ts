import { ICreateClassroom } from './classroom.interface';
import ClassroomModel from './models/classroom.model';

class ClassroomRepository {
    constructor() {

    }

    async create(data: any): Promise<ICreateClassroom> {
        return ClassroomModel.create({ ...data });
    }

    async update(userID: String, classroomID: String, updateData: any) {
        const classroomUpdate = await ClassroomModel.updateOne({
            userID: userID,
            ID: classroomID,
        }, {
            ...updateData,
        });
        if (classroomUpdate.nModified > 0) {
            return true;
        }
        return false;
    }

    async deleted(userID: String, classroomID: String) {
        const classroomUpdate = await ClassroomModel.updateOne({
            userID: userID,
            ID: classroomID,
        }, {
            isDeleted: true,
        });
        if (classroomUpdate.nModified > 0) {
            return true;
        }
        return false;
    }
}

export default ClassroomRepository;