import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { UserCollection } from "../models/user.js";
import { SessionCollection } from "../models/Session.js";

const ACCESS_SECRET = process.env.ACCESS_SECRET || "access_secret_key";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw createHttpError(401, "No token provided");
    }

    const token = authHeader.split(" ")[1];

    let payload;
    try {
      payload = jwt.verify(token, ACCESS_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        throw createHttpError(401, "Access token expired");
      }
      throw createHttpError(401, "Invalid access token");
    }

    // 🔹 Перевіряємо, що токен є у сесіях
    const session = await SessionCollection.findOne({ accessToken: token });
    if (!session) {
      throw createHttpError(401, "Session not found or logged out");
    }

    const user = await UserCollection.findById(payload.userId).select("-password");
    if (!user) {
      throw createHttpError(401, "User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
