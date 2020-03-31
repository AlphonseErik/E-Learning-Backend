import { Types, Document } from 'mongoose';
export interface INotification extends Document {
    ID: String;
    title: String;
    content: String;
    htmlJson: String;
    description: String;
    isGlobal: Boolean;
    userIDs: String;
    isDeleted: String;
}
export interface ICreateNotification {
    content: String;
    title: String;
    htmlJson: String;
    description: String;
    isGlobal: Boolean;
    userIDs: String;
    isDeleted: String;
}
