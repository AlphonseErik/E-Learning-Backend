import * as mongoose from 'mongoose';
import uuid from 'uuid'
import { Schema } from 'mongoose';
const bcrypt = require('bcryptjs');
import { INotification } from '../notification.interface';
import mongoosePaginate from 'mongoose-paginate';

const NotificationSchema = new Schema({
    ID: {
        type: String,
        default: function () {
            return uuid.v1();
        },
    },
    title: {
        type: String,
        default: ""
    },
    htmlJson: {
        type: String,
        default: ""
    },
    content: {
        type: String,
    },
    description: {
        type: String,
        default: 'Send notification'
    },
    isGlobal: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: ''
    },
    userIDs: [{
        type: String,
    }],
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});


NotificationSchema.plugin(mongoosePaginate);
const NotificationModel = mongoose.model<INotification>('Notification', NotificationSchema);
export default NotificationModel;