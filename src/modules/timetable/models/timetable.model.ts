import * as mongoose from 'mongoose';
import uuid from 'uuid'
import { Schema } from 'mongoose';
import { ITimetable } from '../timetable.interface';
import mongoosePaginate from 'mongoose-paginate';

const TimetableSchema = new Schema({
    ID: {
        type: String,
        default: uuid.v1(),
    },
    userID: { // created by
        type: String,
        default: "",
    },
    teacherID: {
        type: String,
        default: "",
    },
    studentID: {
        type: String,
        default: "",
    },
    schedule: {
        type: String,
    },
    isDeleted: {
        type: String,
        default: false,
    }
}, {
    timestamps: true,
});


TimetableSchema.plugin(mongoosePaginate);
const TimetableModel = mongoose.model<ITimetable>('Timetable', TimetableSchema);
export default TimetableModel;