import TimetableModel from './models/timetable.model';
import { ITimetable, ICreateTimetable } from './timetable.interface';

class TimetableRepository {
    constructor() {

    }

    async create(data: any): Promise<ICreateTimetable | null | any> {
        return TimetableModel.create({ ...data });
    }

    async getList(userID: string, limit: number = 12, page: number = 1): Promise<ITimetable | any | null> {
        const regex = new RegExp(userID, 'i')
        return TimetableModel.paginate({
            isDeleted: false,
            $or: [
                { teacherID: { $regex: regex } },
                { studentID: { $regex: regex } },
            ]
        }, {
            sort: { createdAt: -1 },
            limit: Number(limit),
            page: Number(page),
            select: "-_id -__v"
        })
    }

    async update(userID: string, scheduleid: string, updateData: any) {
        let getData = await TimetableModel.updateOne({
            userID: userID,
            ID: scheduleid,
            isDeleted: false
        }, {
            ...updateData
        })
        if (getData.nModified > 0) {
            return true;
        }
        return false;
    }
}

export default TimetableRepository;