import BaseController from '../../commons/base/controller.base';
import AuthReponsitory from './auth.reponsitory';
import UserRepository from '../user/user.reponsitory';
import NotificationRepository from '../notification/notification.repository';
import moment from 'moment';
import sha256 from 'sha256';
import { BadRequestException, UnauthorizedException } from '../../commons/errors/index';
import { USER_NOT_FOUND } from '../user/user.message';
import { CREATE_TOKEN_FAILED, UNAUTHORIZE, INVALID_TOKEN, ERR_MISSING_INPUT } from './auth.message';
import { sendMail, sendNotificationOptions } from '../../helpers/sendMail';

class AuthController extends BaseController {
    authRepository: AuthReponsitory;
    userRepository: UserRepository;
    notificationRepository: NotificationRepository;
    constructor() {
        super();
        this.authRepository = new AuthReponsitory();
        this.userRepository = new UserRepository();
        this.notificationRepository = new NotificationRepository();
    }

    async signIn(req: any, res: any, next: any) {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                throw new BadRequestException(ERR_MISSING_INPUT);
            }
            let user = await this.userRepository.getUserByUserNameAndPassword(username);
            if (!(user && user.comparePassword(password))) {
                throw new UnauthorizedException(USER_NOT_FOUND);
            }
            // store token
            let userID: any = user.ID;
            let expirationDate = moment().add(2, 'day');
            let respone = await this.userRepository.getById(userID);
            if (respone.email) {
                await sendMail(sendNotificationOptions({
                    to: respone.email,
                    email: respone.email,
                    title: "LOGIN",
                    content: `
                    <p>Welcome to E-learning</p>
                    <p>You just have login with username: ${username}</p>
                    <p>If this activity is not your operation. Please contact us immediately</p>
                    `,
                    type: "LOGIN",
                }))
            }
            // Generate token
            let accesstoken = sha256(`${userID}-${moment()}`)
            let createToken = await this.authRepository.createToken({
                userID: userID,
                expirationDate: expirationDate,
                accesstoken,
            });
            if (!createToken) {
                throw new BadRequestException(CREATE_TOKEN_FAILED)
            }
            return res.json({
                accesstoken,
                expirationDate,
            });
        } catch (err) {
            next(err);
        }
    }

    async logout(req: any, res: any, next: Function) {
        try {
            let userID = req.headers.userid;
            let accesstoken = req.headers["accesstoken"];
            console.log(userID, accesstoken)
            let isValidToken = await this.authRepository.getToken({
                accesstoken,
            });

            if (!isValidToken) {
                throw new BadRequestException(UNAUTHORIZE);
            }
            if (isValidToken.isLogout) {
                throw new BadRequestException(UNAUTHORIZE);
            }
            let logout = await this.authRepository.updateToken(userID, accesstoken, {
                isLogout: true
            })
            res.json({
                isUpdated: logout
            });
        } catch (error) {
            next(error);
        }
    }

    async verifyToken(req: any, res: any, next: any) {
        try {
            let accesstoken = req.headers.accesstoken;
            let isValidToken = await this.authRepository.getToken({
                accesstoken,
            });

            if (!isValidToken) {
                throw new BadRequestException(INVALID_TOKEN);
            }
            if (isValidToken.isLogout) {
                throw new BadRequestException(INVALID_TOKEN);
            }
            if (moment(isValidToken.expirationDate).valueOf() - moment().valueOf() < 0) {
                throw new BadRequestException(INVALID_TOKEN);
            }
            let respone = await this.userRepository.getById(isValidToken.userID);
            return res.json({
                userID: isValidToken.userID,
                isSuperAdmin: respone.isSuperAdmin,
                type: respone.type,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController;