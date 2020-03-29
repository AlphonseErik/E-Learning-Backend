import UserRuleModel from './models/userRule.model';
import { ICreateUserRule, IUserRule } from './userRule.interface';
import { Types } from 'mongoose';

class UserRuleRepository {
    constructor() {

    }

    async create(data: IUserRule): Promise<ICreateUserRule> {
        return await UserRuleModel.create(data);
    }
    async update(id: String, dataUpdate: any) {
        const isUpdated = await UserRuleModel.updateOne({
            ID: id,
        }, {
            ...dataUpdate,
        });
        if (isUpdated.nModified > 0) {
            return true;
        }
        return false;
    }
    async getUserRuleByData(data: any) {
        return UserRuleModel.find({
            ...data,

        }).select("name read write ID -_id")
    }
    async getAll(limit: number = 12, page: number = 1) {
        return UserRuleModel.paginate({
            isDeleted: false
        }, {
            sort: { createdAt: -1 },
            limit: Number(limit),
            page: Number(page),
        });
    }
    async getGroupById(_id: string): Promise<ICreateUserRule | null | any> {
        return UserRuleModel.findOne({ _id });
    }
    async getGroupByName(name: string): Promise<ICreateUserRule | null | any> {
        return UserRuleModel.findOne({ name });
    }
    async search(keyword: string = '', limit: number = 12, page: number = 1) {
        const regex = new RegExp(keyword, 'i')
        return UserRuleModel.paginate({
            $or: [
                { name: { $regex: regex } },
            ]
        }, {
            sort: { createdAt: -1 },
            limit: Number(limit),
            page: Number(page),
        });
    }
}

export default UserRuleRepository;