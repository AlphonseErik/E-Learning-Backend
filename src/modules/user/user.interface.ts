import { Types, Document } from 'mongoose';
export interface IUser extends Document {
    ID: String,
    username: String,
    password: string,
    fullName: String,
    phoneNumber: String,
    birthday: Date,
    isSuperAdmin: Boolean,
    isDeleted: Boolean,

    comparePassword: Function;
}
export interface ICreateUser extends Document {
    username: String,
    password: string,
    fullName: String,
    phoneNumber: String,
    birthday: Date,
    isSuperAdmin: Boolean,
    isDeleted: Boolean,
}


