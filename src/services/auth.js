/* eslint-disable no-unused-vars */
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { UserCollection } from "../models/User.js";
import { SessionCollection } from "../models/Session.js";

const ACCESS_SECRET = process.env.ACCESS_SECRET || "access_secret_key";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "refresh_secret_key";

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await UserCollection.findOne({ email });
  if (existingUser) throw createHttpError(409, "Email in use");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserCollection.create({ name, email, password: hashedPassword });
  const { password: _, ...userData } = user.toObject();
  return userData;
};

export const loginUser = async ({ email, password }) => {
  const user = await UserCollection.findOne({ email });
  if (!user) throw createHttpError(401, "Email or password is wrong");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw createHttpError(401, "Email or password is wrong");

  await SessionCollection.deleteOne({ userId: user._id });

  const accessToken = jwt.sign({ userId: user._id }, ACCESS_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ userId: user._id }, REFRESH_SECRET, { expiresIn: "30d" });

  const accessTokenValidUntil = new Date(Date.now() + 15 * 60 * 1000);
  const refreshTokenValidUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  await SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return { accessToken, refreshToken };
};

export const refreshSession = async (refreshTokenFromCookie) => {
  if (!refreshTokenFromCookie) {
    throw createHttpError(401, "No refresh token provided");
  }

  let payload;
  try {
    payload = jwt.verify(refreshTokenFromCookie, REFRESH_SECRET);
  } catch {
    throw createHttpError(401, "Invalid refresh token");
  }

  const session = await SessionCollection.findOne({ refreshToken: refreshTokenFromCookie });
  if (!session) throw createHttpError(401, "Session not found");

  await SessionCollection.deleteOne({ _id: session._id });

  const accessToken = jwt.sign({ userId: payload.userId }, ACCESS_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ userId: payload.userId }, REFRESH_SECRET, { expiresIn: "30d" });

  const accessTokenValidUntil = new Date(Date.now() + 15 * 60 * 1000);
  const refreshTokenValidUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  await SessionCollection.create({
    userId: payload.userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return { accessToken, refreshToken };
};

export const logoutUser = async (refreshToken) => {
  if (!refreshToken) {
    throw createHttpError(401, "No refresh token provided");
  }

  const session = await SessionCollection.findOne({ refreshToken });
  if (!session) {
    throw createHttpError(401, "Session not found");
  }

  await SessionCollection.deleteOne({ _id: session._id });
};
