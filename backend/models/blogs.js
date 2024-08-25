import { Schema, model } from "mongoose";

const blogSchema = Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    cat: { type: String, required: true },
    uId: {
        type: Schema.Types.ObjectId,
        ref: "getblogs-users",
        required: true
    },
}, { timestamps: true })

export const BlogModel = model("getblogs-blogs", blogSchema)
