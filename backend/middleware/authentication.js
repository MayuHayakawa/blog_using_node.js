import { verifyToken } from "../util/jwtUtil.js";

const authentication = (req, res, next) => {
    const { authentization } = req.headers;

    if(!authentization) {
        return res.status(401).json({
            message: "1st Unauthorized error",
            headers: req.headers
        });
    }
    const user = verifyToken(authentization);
    
    if(!user) {
        return res.status(401).json({
            message: "2nd Unauthorized error"
        });
    }

    req.user = user;
    next();
}

export { authentication }