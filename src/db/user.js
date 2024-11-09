import { model, Schema } from 'mongoose';
import { ROLES } from '../constants/index.js';
const usersSchema = new Schema(
    {
        name: { type: String, requirerd: true },
        email: { type: String, requirerd: true, unique: true },
        password: { type: String, requirerd: true },
        role: {
            type: String,
            enum: [ROLES.TEACHER, ROLES.PARENT],
            default: ROLES.PARENT,
        },
    },
    { timestamps: true, varsionKey: false },
);
usersSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};
// export const UsersCollection = model('users', usersSchema);
export const UsersCollection = model('auth', usersSchema);
