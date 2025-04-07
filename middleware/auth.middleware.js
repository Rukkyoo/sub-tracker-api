import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

export const authorize = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      const error = new Error("Not authenticated");
      error.statusCode = 401;
      throw error;
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      const error = new Error("Not authorized");
      error.statusCode = 401;
      throw error;
    }
    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      error.statusCode = 401;
      error.message = "Token expired";
    } else if (error.name === "JsonWebTokenError") {
      error.statusCode = 401;
      error.message = "Invalid token";
    }
    next(error);
  }
};
