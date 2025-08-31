import express from "express";
import cors from "cors";
import pino from "pino-http";
import authRouter from "./routes/auth.js";
import contactsRouter from "./routes/contacts.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";


function setupServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;


  app.use(cors());
  app.use(pino());
  app.use(express.json());

  app.use("/auth", authRouter);
  app.use("/contacts", contactsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export { setupServer };
