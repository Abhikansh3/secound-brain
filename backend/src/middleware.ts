
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers["authorization"];
  if (!header) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(header, JWT_SECRET) as JwtPayload;
    //@ts-ignore
    req.userId = decoded.id;
    next();
  } catch {
    res.status(403).json({ message: "you are not logged in" });
  }
};
