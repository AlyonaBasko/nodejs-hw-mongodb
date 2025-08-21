import mongoose from "mongoose";
import createHttpError from "http-errors";

export const isValidId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.contactId)) {
    return next(createHttpError(400, "Invalid contact ID"));
  }
  next();
};
