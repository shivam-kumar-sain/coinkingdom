import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../lib/mongodb";
import User from "../../../../models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { email, password } = req.body;

  try {
    await connectDB();
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });

    res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=3600`);
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
