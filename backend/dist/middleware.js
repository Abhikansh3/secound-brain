import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
export const userMiddleware = (req, res, next) => {
    const header = req.headers["authorization"];
    if (!header) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decoded = jwt.verify(header, JWT_SECRET);
        req.userId = decoded.id;
        next();
    }
    catch {
        res.status(403).json({ message: "Invalid token" });
    }
};
//# sourceMappingURL=middleware.js.map