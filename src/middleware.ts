
// import type { NextFunction, Request, Response } from "express";
// import jwt  from "jsonwebtoken";
// import {JWT_PASSWORD} from './config.js'

// export const userMiddleware = (req:Request , res:Response , next: NextFunction) => {
//     const header = req.headers['authorization'];
//     const decoded = jwt.verify(header as string,JWT_PASSWORD)
//     if(decoded){

//         req.userId = decoded.id as string;   //overide the types of express request object
//         next()
//     }else{
//         res.status(403).json({
//             msg:"You are not logged in"
//         })
//     }
// }


import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken"; 
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config.js";

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers["authorization"];

  if (!header) {
    return res.status(403).json({ msg: "No token provided" });
  }

  try {
    const decoded = jwt.verify(header, JWT_PASSWORD) as JwtPayload;

    if (decoded && typeof decoded === "object" && "id" in decoded) {
      req.userId = decoded.id as string;
      return next();
    }

    return res.status(403).json({ msg: "Invalid token" });
  } catch (err) {
    return res.status(403).json({ msg: "You are not logged in" });
  }
};
