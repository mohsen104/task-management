import model from "@/models/user";
import ConnectToDB from "@/configs";

export default async function handler(req, res) {
    ConnectToDB();
    if (req.method !== "GET") {
        return false;
    }

    const data = await model.find({}, "-password -updatedAt -__v");
    return res.status(200).json(data);
}
