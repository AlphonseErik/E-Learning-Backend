import * as mongoose from 'mongoose';
import uuid from 'uuid'
import { Schema } from 'mongoose';
import { IUserRule } from '../userRule.interface';
import mongoosePaginate from 'mongoose-paginate';

const UserRuleSchema = new Schema({
    ID: {
        type: String,
        default: function () {
            return uuid.v1();
        },
    },
    name: {
        type: String,
        default: '',
        required: true
    },
    read: {
        type: Number,
        default: 0
    },
    write: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});


UserRuleSchema.pre<IUserRule>('save', function (next) {
    next();
});


UserRuleSchema.plugin(mongoosePaginate);
const UserRuleModel = mongoose.model<IUserRule>('UserRule', UserRuleSchema);
export default UserRuleModel;