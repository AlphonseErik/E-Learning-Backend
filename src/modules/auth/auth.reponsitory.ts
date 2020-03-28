import AccessTokenModel from './models/accesstoken.model';
import { IAccessToken, ICreateAccessToken } from './auth.interfaces';

class AuthRepository {
    constructor() {
    }

    async getToken(data: any): Promise<IAccessToken | null | any> {
        return AccessTokenModel.findOne({ ...data });
    }

    async createToken(data: any): Promise<ICreateAccessToken | null | any> {
        return AccessTokenModel.create({ ...data });
    }

    async updateToken(userID: string, accesstoken: string, data: any): Promise<IAccessToken | null | any> {
        const updated = await AccessTokenModel.updateOne({
            userID,
            accesstoken
        }, {
            ...data
        });
        if (updated.nModified > 0) {
            return true;
        }
        return false;
    }
}

export default AuthRepository;