import model from "@/models/user";
import ConnectToDB from "@/configs";

export default async function handler(req, res) {
    ConnectToDB();
    const { _id, avatar } = req.body;
    if (req.method !== "PUT") {
        return false;
    }
    await model.findOneAndUpdate({ _id: _id }, { avatar: avatar });
    res.status(200).json({ message: "successfully !" });
}
