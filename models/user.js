import mongoose from "mongoose";

const schema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "USER"
    },
    avatar: {
        type: String,
        required: true,
        default: "avatar1"
    },
}, { timestamps: true })

const model = mongoose.models.user || mongoose.model("user", schema);

export default model;