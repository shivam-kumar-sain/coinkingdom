// src/pages/api/auth/verify.ts
import { NextApiRequest, NextApiResponse } from "next";
import {authenticateToken} from "../../../../src/utils/authMiddleware";
import verifyAuth from "../../../../src/utils/veri";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  verifyAuth(req, res, () => {
    res.status(200).json({ isAuthenticated: true, user: req.user });
  });
}
