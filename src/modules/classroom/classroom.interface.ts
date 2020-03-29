import { Types, Document } from 'mongoose';
export interface IClassroom extends Document {
    ID: String;
    className: String,
    userID: String,
    isActive: Boolean,
    isDeleted: Boolean,
}
export interface ICreateClassroom extends Document {
    className: String,
    userID: String,
    isActive: Boolean,
    isDeleted: Boolean,
}