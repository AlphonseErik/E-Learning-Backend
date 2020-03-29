import { Types, Document } from 'mongoose';

export interface IRule extends Document {
    _id: Types.ObjectId;
    nameApi: String;
    isDeleted: Boolean;
}

export interface ICreateRule extends Document {
    nameApi: String;
}