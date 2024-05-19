import ConnectToDB from "@/configs";
import { serialize } from "cookie";

export default async function handler(req, res) {
  ConnectToDB();

  if (req.method !== "GET") {
    return false;
  }

  return res.setHeader("Set-Cookie", serialize("token", '', {
    path: "/",
    maxAge: 0
  })).status(200).json({ message: "successfully !" });
}
