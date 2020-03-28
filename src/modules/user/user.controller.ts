import _ from 'lodash';
import BaseController from '../../commons/base/controller.base';
import UserRepository from './user.reponsitory';
import { BadRequestException } from '../../commons/errors/index';


class UserController extends BaseController {
    userRepository: UserRepository;
    constructor() {
        super();
        this.userRepository = new UserRepository();
    }

    async register(req: any, res: any, next: any) {
        try {
            let { username, email, mobilePhone } = req.body;
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
            let user = await this.userRepository.create(req.body);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async getProfile(req: any, res: any, next: any) {
        try {
            let userID = req.headers.userid;
            // let userID = "386fa530-1261-11ea-8869-1dc4ae15c1a4";
            const user = await this.userRepository.getById(userID, "-_id -password -isSuperAdmin -__v -isDeleted");
            if (!user)
                throw new BadRequestException();
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;