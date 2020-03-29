import { UnauthorizedException, BadRequestException } from '../commons/errors';
import { NO_PERMISSION } from '../commons/errorMessage/index';
import AuthRepository from '../modules/auth/auth.reponsitory';
import moment from 'moment';
import UserReponsitory from '../modules/user/user.reponsitory';
import UserRuleRepository from '../modules/userRule/userRule.repository';

const authRepository = new AuthRepository();
const userRepository = new UserReponsitory();
const userRuleRepository = new UserRuleRepository();

export const verifyAccessToken = () => {
    return async (req: any, res: any, next: any) => {
        try {
            const accesstoken = req.headers.accesstoken;
            if (!accesstoken) {
                throw new UnauthorizedException(NO_PERMISSION);
            }
            let isValidToken = await authRepository.getToken({
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
            const user = await userRepository.getById(isValidToken.userID);
            console.log(user)
            if (user) {
                if (user.isSuperAdmin) {
                    next();
                    return;
                }
                if (user.type === 1) {
                    let userRulesData: any[] = await userRuleRepository.getUserRuleByData(isValidToken.userID);
                    console.log(userRulesData);
                    if (userRulesData.length > 0) {
                        userRulesData.map((item: any) => {
                            const isUserHasRule = userRulesData.find((uRule) => uRule.name === item.rule);
                            if (!isUserHasRule) {
                                throw new UnauthorizedException(NO_PERMISSION);
                            }
                            // Check read and write permission
                            if (item.read && item.read != isUserHasRule.read) {
                                throw new UnauthorizedException(NO_PERMISSION);
                            }
                            if (item.write && item.write != isUserHasRule.write) {
                                throw new UnauthorizedException(NO_PERMISSION);
                            }
                        })
                    }
                    next();
                } else {
                    throw new UnauthorizedException(NO_PERMISSION);
                }
            }
            throw new UnauthorizedException(NO_PERMISSION);
        } catch (err) {
            next(err);
        }
    }
}