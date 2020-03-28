import * as mongoose from 'mongoose';
import uuid from 'uuid';
import { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../user.interface';
import mongoosePaginate from 'mongoose-paginate';

const UserSchema = new Schema({
    ID: {
        type: String,
        default: uuid,
    },
    username: {
        type: String,
        default: '',
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        default: '',
    },
    phoneNumber: {
        type: String,
        default: '',
    },
    birthDate: {
        type: Date,
        default: Date.now,
    },
    isSuperAdmin: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

UserSchema.pre<IUser>('save', function (next) {
    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) { return next(); }
    // Hash password
    const hash = bcrypt.hashSync(this.password, process.env.SECRET_PASSWORD);
    this.password = hash;
    next();
});

UserSchema.methods.comparePassword = function (password: string) {
    const user = this;
    return bcrypt.compareSync(password, user.password);
};

UserSchema.plugin(mongoosePaginate);
const UserModel = mongoose.model<IUser>('user', UserSchema);
export default UserModel;