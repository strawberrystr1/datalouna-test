import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes";
import { errorsMiddleware } from "./middlewares/error.middleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const bootstrap = async () => {
  app.use(express.json());
  app.use(cookieParser());

  app.use("/api", router);
  app.use(errorsMiddleware);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

bootstrap();
