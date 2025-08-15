import express from "express";
import cors from "cors";
import pino from "pino-http";
import contactsRouter from "./routes/contacts.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(pino());
app.use(express.json());

app.use("/contacts", contactsRouter);

// 404
app.use(notFoundHandler);


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
