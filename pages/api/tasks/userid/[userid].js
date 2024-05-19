import model from "@/models/task";
import ConnectToDB from "@/configs";

export default async function handler(req, res) {
    ConnectToDB();
    const { userid } = req.query;
    if (req.method !== "GET") {
        return false;
    }
    const data = await model.find({ user: userid }, "-createdAt -__v").populate("user", "firstname lastname");
    return res.status(200).json(data);
}
