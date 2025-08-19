// src/middlewares/isValidId.js
import mongoose from "mongoose";
import createHttpError from "http-errors";

export const isValidId = (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      throw createHttpError(400, `${contactId} is not a valid ID`);
    }

    next();
  } catch (error) {
    next(error);
  }
};
