import * as mongoose from 'mongoose';
import uuid from 'uuid';
import { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import { IClassroom } from '../classroom.interface';

const ClassroomSchema = new Schema({
    ID: {
        type: String,
        default: uuid,
    },
    className: {
        type: String,
        default: "",
    },
    userID: {
        type: String,
        required: true,
    },
    detail: {
        type: String,
        default: "",
    },
    studentDetail: {
        type: [String],
        default: "",
    },
    amountAvailable: {
        type: Number,
        default: 20,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

ClassroomSchema.plugin(mongoosePaginate);
const ClassroomModel = mongoose.model<IClassroom>('Classroom', ClassroomSchema);
export default ClassroomModel;