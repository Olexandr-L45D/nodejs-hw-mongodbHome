import { model, Schema } from 'mongoose';
const usersSchema = new Schema(
    {
        name: { type: String, requirerd: true },
        email: { type: String, requirerd: true, unique: true },
        password: { type: String, requirerd: true },
    },
    { timestamps: true, varsionKey: false },
);
usersSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};
export const UsersCollection = model('users', usersSchema);
// export const UsersCollection = model('register', usersSchema);
