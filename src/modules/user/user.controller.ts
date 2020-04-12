import _ from 'lodash';
import BaseController from '../../commons/base/controller.base';
import UserRepository from './user.reponsitory';
import AuthRepository from '../auth/auth.reponsitory';
import { BadRequestException, UnauthorizedException } from '../../commons/errors/index';
import { USER_NOT_FOUND } from './user.message';
import { NO_PERMISSION } from '../../commons/errorMessage';
import moment from 'moment';


class UserController extends BaseController {
    userRepository: UserRepository;
    authRepository: AuthRepository;
    constructor() {
        super();
        this.userRepository = new UserRepository();
        this.authRepository = new AuthRepository();
    }

    async register(req: any, res: any, next: any) {
        try {
            let accesstoken = req.headers.accesstoken;
            let { username, email, mobilePhone, type } = req.body;
            if (req.body.type !== undefined) {
                req.body.type = 0;
            }
            let usernameExist = await this.userRepository.getUserByUsername(username);
            if (usernameExist) {
                throw new BadRequestException();
            }
            let emailExist = await this.userRepository.getUserByEmail(email);
            if (emailExist) {
                throw new BadRequestException();
            }
            let mobilePhoneExist = await this.userRepository.getUserByPhone(mobilePhone);
            if (mobilePhoneExist) {
                throw new BadRequestException();
            }
            if (type === 1) {
                if (!accesstoken) {
                    throw new UnauthorizedException(NO_PERMISSION);
                }
                let isValidToken = await this.authRepository.getToken({
                    accesstoken,
                });
                console.log(isValidToken)
                if (!isValidToken) {
                    throw new BadRequestException(NO_PERMISSION);
                }
                if (isValidToken.isLogout) {
                    throw new BadRequestException(NO_PERMISSION);
                }
                if (moment(isValidToken.expirationDate).valueOf() - moment().valueOf() < 0) {
                    throw new BadRequestException(NO_PERMISSION);
                }
                const user = await this.userRepository.getById(isValidToken.userID);
                console.log(user)
                if (user) {
                    if (user.isSuperAdmin) {
                        next();
                        return;
                    }
                    throw new BadRequestException(NO_PERMISSION);
                }
                throw new BadRequestException(NO_PERMISSION);
            }
            let user = await this.userRepository.create(req.body);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async getProfile(req: any, res: any, next: any) {
        try {
            let userID = req.headers.userid;
            console.log(userID)
            const user = await this.userRepository.getById(userID, "-_id -password -isSuperAdmin -__v -isDeleted -createdAt -updatedAt -type");
            if (!user)
                throw new BadRequestException(USER_NOT_FOUND);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async search(req: any, res: any, next: any) {
        try {
            let { keyword, limit, page } = req.query;
            let search = await this.userRepository.search(keyword, limit, page);
            return res.json(search)
        } catch (err) {
            next(err)
        }
    }
}

export default UserController;