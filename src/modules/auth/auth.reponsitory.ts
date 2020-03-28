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
}

export default AuthRepository;