import NotificationModel from './models/notification.model';
import { INotification, ICreateNotification } from './notification.interface';

class Notificationepository {
    constructor() {

    }

    async create(data: ICreateNotification): Promise<INotification | null | any> {
        return NotificationModel.create(data);
    }
}

export default Notificationepository;