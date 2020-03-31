import BaseController from '../../commons/base/controller.base';
import NotificationRepository from './notification.repository'
import UserRepository from '../user/user.reponsitory';
import { sendMail, sendNotificationOptions } from '../../helpers/sendMail';

class NotificationController extends BaseController {
    notificationRepository: NotificationRepository;
    userRepository: UserRepository;
    constructor() {
        super();
        this.notificationRepository = new NotificationRepository();
        this.userRepository = new UserRepository();
    }

    async createNotification(req: any, res: any, next: any) {
        try {
            let { type, title, content, isSendToEmail, isGlobal } = req.body;
            req.body.emails = [];
            let { userIDs } = req.body;
            let respone = await this.userRepository.getUsersByIds(userIDs);

            req.body.emails = respone.map((item: any) => {
                return item.email
            })
            if (isSendToEmail) {
                req.body.emails.map((email: string) => {
                    sendMail(sendNotificationOptions({
                        email: email,
                        title: title,
                        content: content,
                        type,
                    }));
                });
            }
            let create = await this.notificationRepository.create(req.body);
            res.json(create)
        } catch (error) {
            next(error);
        }
    }

    async sendMail(req: any, res: any, next: any) {
        try {
            let { type, title, content, userID } = req.body;
            let respone = await this.userRepository.getById(userID);
            if (respone.email) {
                let send = await sendMail(sendNotificationOptions({
                    email: respone.email,
                    title: title,
                    content: content,
                    type: type,
                }))
                return res.json(send)
            }
            return res.json(true)
        } catch (error) {
            next(error);
        }
    }
}

export default NotificationController;