import model from "@/models/user";
import ConnectToDB from "@/configs";
import mongoose from "mongoose";

export default async function handler(req, res) {
    ConnectToDB();
    const { userid } = req.query;
    if (req.method !== "GET") {
        return false;
    }
    const user = new mongoose.Types.ObjectId(userid);
    const data = await model.find({ _id: { $ne: user } });
    return res.status(200).json(data);
}
