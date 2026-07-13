import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
export const userMiddleware = (req, res, next) => {
    const header = req.headers["authorization"];
    if (!header) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decoded = jwt.verify(header, JWT_SECRET);
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }
    catch {
        res.status(403).json({ message: "you are not logged in" });
    }
};
//# sourceMappingURL=middleware.js.map