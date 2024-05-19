import model from "@/models/task";
import ConnectToDB from "@/configs";

export default async function handler(req, res) {
    ConnectToDB();
    const { title, desc, link, highlight, highlightColor, time, user, status } = req.body;
    if (req.method === "GET") {
        const data = await model.find({}, "-createdAt -__v").populate("user", "firstname lastname");
        return res.status(200).json(data);
    }

    if (req.method === "POST") {
        await model.create({ title, desc, link, highlight, highlightColor: !highlightColor ? "#000000" : highlightColor, time, user, status });
        res.status(201).json({ message: "successfully !" });
    }
}
