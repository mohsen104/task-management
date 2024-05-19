import model from "@/models/user";
import ConnectToDB from "@/configs";
import { hash } from "bcryptjs";
import { serialize } from "cookie";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    ConnectToDB();

    if (req.method !== "POST") {
        return false;
    }

    const { firstname, lastname, username, email, password } = req.body;

    const isUserExit = await model.findOne({ $or: [{ username }, { email }] })
    if (isUserExit) {
        return res.status(422).json({ message: "This username or email already !" })
    }

    const hashedPassword = await hash(password, 12);

    const generatedToken = jwt.sign({ identifier: email }, process.env.PRIVATE_KEY, { expiresIn: "24h" });

    await model.create({ firstname, lastname, username, email, password: hashedPassword });

    return res.setHeader("Set-Cookie", serialize("token", generatedToken, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24
    })).status(200).json({ message: "successfully !" });
}
