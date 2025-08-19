import createHttpError from "http-errors";

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    const details = err.details?.map((d) => d.message) || ["Invalid request body"];

    const error = createHttpError(400, "Validation error");
    error.details = details; 

    next(error);
  }
};
