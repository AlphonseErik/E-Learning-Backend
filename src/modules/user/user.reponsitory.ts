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
        //     }
        // })
    }

    async create(data: ICreateUser): Promise<IUser | null | any> {
        return UserModel.create(data);
    }

    async getUserByUserNameAndPassword(username: string): Promise<IUser | null> {
        return UserModel.findOne({
            $or: [
                { username: username },
                { mobilePhone: username },
                { email: username },
            ],
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
                { mobilePhone: { $regex: regex } },
                { email: { $regex: regex } },
            ]
        }, {
            sort: { createdAt: -1 },
            limit: Number(limit),
            page: Number(page),
            select: "-privateKey -pk -_id -password"
        })
    }
}

export default UserReponsitory;