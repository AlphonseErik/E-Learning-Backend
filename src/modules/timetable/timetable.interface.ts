import { Types, Document } from 'mongoose';
export interface ITimetable extends Document {
    ID: string;
    userID: string,
    teacherID: string,
    studentID: string,
    schedule: string,
    isDeleted: Boolean,
}
export interface ICreateTimetable {
    userID: string,
    teacherID: string,
    studentID: string,
    schedule: string,
    isDeleted: Boolean,
}
