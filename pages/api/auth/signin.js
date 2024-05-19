import model from "@/models/user";
import ConnectToDB from "@/configs";
import { compare } from "bcryptjs";
import { serialize } from "cookie";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  ConnectToDB();

  if (req.method !== "POST") {
    return false;
  }

  const { identifier, password } = req.body;

  const isUserExit = await model.findOne({ $or: [{ username: identifier }, { email: identifier }] })
  if (!isUserExit) {
    return res.status(422).json({ message: "This username or email already !" })
  }

  const verifyPassword = await compare(password, isUserExit.password);
  if (!verifyPassword) {
    return res.status(422).json({ message: "Wrong in verify password !" })
  }

  const generatedToken = jwt.sign({ identifier }, process.env.PRIVATE_KEY, { expiresIn: "24h" });

  return res.setHeader("Set-Cookie", serialize("token", generatedToken, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24
  })).status(200).json({ message: "successfully !" });
}
