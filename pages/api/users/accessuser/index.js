import model from "@/models/user";
import ConnectToDB from "@/configs";

export default async function handler(req, res) {
    ConnectToDB();
    const { _id, role } = req.body;
    if (req.method !== "PUT") {
        return false;
    }
    await model.findOneAndUpdate({ _id: _id }, { role: role });
    res.status(200).json({ message: "successfully !" });
}
