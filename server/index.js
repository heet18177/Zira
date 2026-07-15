import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import connectionDB from "./Configs/db.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// User Route
import router from "./Routes/UserRoute.js";
app.use("/api/auth", router);
// Project Route
import projectRouter from "./Routes/ProjectRoute.js";
app.use("/api/project", projectRouter);
// Task Route
import taskRouter from "./Routes/TaskRoute.js";
app.use("/api/task", taskRouter);
// Contact Route
import contactRouter from "./Routes/ContactRoute.js";
app.use("/api/contact", contactRouter);

app.listen(port, () => {
  connectionDB();
  console.log(`Server is running on port ${port}`);
});
