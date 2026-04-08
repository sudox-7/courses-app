import jwt from "jsonwebtoken";
import "dotenv/config";
import { FAIL } from "../utils/httpresstatus.js";

const verify = (req, res, next) => {
  const h = req.headers.authorization;

  if (!h || !h.startsWith("Bearer ")) {
    return res.status(401).json({
      status: FAIL,
      message: "missing or invalid Authorization header",
    });
  }

  const token = h.slice(7); // remove "Bearer "
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.userid = payload.sub;      // user id
    req.userRole = payload.role;   // role
    next();
  } catch (err) {
    return res.status(401).json({
      status: FAIL,
      message: "unauthorized",
    });
  }
};

export default verify;