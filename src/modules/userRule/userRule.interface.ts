import { Types, Document } from 'mongoose';

export interface IUserRule extends Document {
    ID: String;
    name: String;
    rules: Array<String>;
    isDeleted: Boolean
}
export interface ICreateUserRule extends Document {
    ID: String;
    name: String;
    rules: Array<String>;
    isDeleted: Boolean
} 