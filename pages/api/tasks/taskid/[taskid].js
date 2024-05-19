import model from "@/models/task";
import ConnectToDB from "@/configs";

export default async function handler(req, res) {
    ConnectToDB();
    const { title, desc, time, status, link } = req.body;
    const { taskid } = req.query;
    if (req.method === "GET") {
        const data = await model.find({ user: taskid }, "-createdAt -__v").populate("user", "firstname lastname");
        return res.status(200).json(data);
    }

    if (req.method === "DELETE") {
        await model.findOneAndDelete({ _id: taskid });
        return res.status(200).json({ message: "successfully !" });
    }

    if (req.method === "PUT") {
        await model.findOneAndUpdate({ _id: taskid }, { title, desc, time, status, link });
        res.status(200).json({ message: "successfully !" });
    }
}