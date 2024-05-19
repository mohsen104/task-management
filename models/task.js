import mongoose from "mongoose";
import user from "@/models/user";

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: false,
    },
    highlight: {
        type: String,
        required: false,
    },
    highlightColor: {
        type: String,
        required: false,
        default: "#000000",
    },
    time: {
        type: Number,
        required: false,
        default: 0,
    },
    link: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: true,
        default: "Todo",
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true,
    }
}, { timestamps: true })

const model = mongoose.models.task || mongoose.model("task", schema);

export default model;