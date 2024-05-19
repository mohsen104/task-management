import model from "@/models/user";
import ConnectToDB from "@/configs";
import { verify } from "jsonwebtoken";

export default async function handler(req, res) {
  ConnectToDB();

  if (req.method !== "GET") {
    return false;
  }

  try {

    const { token } = req.cookies;

    if (!token) {
      return res.status(422).json({ message: "Token invalid !" })
    }

    const tokenPayload = verify(token, process.env.PRIVATE_KEY);

    if (!tokenPayload) {
      return {
        redirect: { destination: "/" }
      }
    }
    const user = await model.findOne({ $or: [{ username: tokenPayload.identifier }, { email: tokenPayload.identifier }] }, "firstname lastname username role avatar")

    return res.status(200).json(user)

  } catch (error) {
    console.log(error);
    return false;
  }
}