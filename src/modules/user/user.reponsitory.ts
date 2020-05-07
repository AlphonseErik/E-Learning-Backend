import UserModel from './models/user.model';
import { IUser, ICreateUser } from './user.interface';
import bcrypt from 'bcryptjs';

class UserReponsitory {
    constructor() {
        // UserModel.find({}).then(res => {
        //     if (res.length <= 0) {
        //         UserModel.create({
        //             username: "Admin",
        //             password: "123456",
        //             type: 1,
        //             isVerifyEmail: true,
        //             isSuperAdmin: true,
        //         })
        //         return
        //     }
        // })
    }

    async create(data: ICreateUser): Promise<IUser | null | any> {
        return UserModel.create(data);
    }

    async getUsersByIds(ids: string[], select: string = "") {
        const users = await UserModel.find({
            isDeleted: false,
            ID: {
                $in: ids
            }
        }).select(select);
        return users;
    }

    async getUserByUserNameAndPassword(username: string): Promise<IUser | null> {
        return UserModel.findOne({
            username: username,
            isActive: true,
            isDeleted: false,
        }).select('-_id -createdAt -updatedAt -__v -isDeleted -firstName -type -emailVerifycode');
    }

    async getUserByUsername(username: string): Promise<IUser | null | any> {
        return UserModel.findOne({ username, isDeleted: false, isSuperAdmin: false });
    }

    async getUserByEmail(email: string): Promise<IUser | null | any> {
        return UserModel.findOne({ email, isDeleted: false, isSuperAdmin: false });
    }

    async getUserByPhone(mobilePhone: string): Promise<IUser | null | any> {
        return UserModel.findOne({ mobilePhone, isDeleted: false, isSuperAdmin: false });
    }

    async updatePassword(id: string, dataUpdate: any) {
        dataUpdate.password = bcrypt.hashSync(dataUpdate.password, process.env.SECRET_PASSWORD);
        const isUpdated = await UserModel.updateOne({
            ID: id,
        }, {
            ...dataUpdate,
        });
        if (isUpdated.nModified > 0) {
            return true;
        }
        return false;
    }

    async getById(targetId: string, select: string = ""): Promise<IUser | null | any> {
        return UserModel.findOne({
            ID: targetId,
            isDeleted: false,
        }).select(select);
    }

    async search(keyword: string = '', limit: number = 12, page: number = 1, types: Array<number> = [0, 1]) {
        const regex = new RegExp(keyword, 'i')
        return UserModel.paginate({
            isDeleted: false,
            isSuperAdmin: false,
            type: {
                $in: types
            },
            $or: [
                { username: { $regex: regex } },
                { fullName: { $regex: regex } },
                { email: { $regex: regex } },
            ]
        }, {
            sort: { createdAt: -1 },
            limit: Number(limit),
            page: Number(page),
            select: "-_id -password"
        })
    }

    async getUserByName(name: String, option: any): Promise<IUser | null | any> {
        return UserModel.findOne({
            fullName: name,
            type: option.type ? option.type : {},
            isDeleted: false,
            isActive: false
        }).select('-__v -id -createdAt -updatedAt')
    }

    async getAllStudent(limit: number = 12, page: number = 1) {
        return UserModel.paginate({
            isDeleted: false,
            type: 0,
        }, {
            sort: { createdAt: -1 },
            limit: Number(limit),
            page: Number(page),
            select: ""
        })
    }

    async getAllTeacher(limit: number = 12, page: number = 1) {
        return UserModel.paginate({
            isDeleted: false,
            type: 1,
        }, {
            sort: { createdAt: -1 },
            limit: Number(limit),
            page: Number(page),
            select: ""
        })
    }
}

export default UserReponsitory;