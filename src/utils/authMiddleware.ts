import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export function authenticateToken(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.authToken;

  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
}
