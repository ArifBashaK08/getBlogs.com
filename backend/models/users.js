import { Schema, model } from "mongoose";

const userSchema = Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    img: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true })

export const UserModel = model("getblogs-users", userSchema)

