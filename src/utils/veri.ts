// src/utils/authMiddleware.ts
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

// Middleware to check authentication
const verifyAuth = (req: NextApiRequest, res: NextApiResponse, next: Function) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next(); 
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default verifyAuth;
