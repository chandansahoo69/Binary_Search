import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { initializeSocket } from "./utils/socket.js";
import http from "http";

const PORT = process.env.PORT || 8000;
const SOCKET_URL = process.env.SOCKET_URL;
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

const server = http.createServer(app);

initializeSocket(server, {
  cors: {
    origins: ["*"],
    methods: ["GET", "POST"],
  },
  path: SOCKET_URL,
});

// io.on("connection", async (socket) => {
//   console.log("Connection Successful with socket id: " + socket.id);

//   io.emit("connection", "Connection Successful with socket id: " + socket.id);

//   setTimeout(() => {
//     io.emit("testing", "Connection Successful with socket id: " + socket.id);
//   }, 3000);
// });

// routes import
import userRouter from "./routes/user.routes.js";
import roomRouter from "./routes/room.routes.js";
import questionRouter from "./routes/question.routes.js";
import notificationRouter from "./routes/notification.routes.js";
import eventRouter from "./routes/event.routes.js";

// routes declaration
app.use(`${process.env.CONFIG_PATH}/users`, userRouter);
app.use(`${process.env.CONFIG_PATH}/room`, roomRouter);
app.use(`${process.env.CONFIG_PATH}/question`, questionRouter);
app.use(`${process.env.CONFIG_PATH}`, notificationRouter);
app.use(`${process.env.CONFIG_PATH}/events`, eventRouter);
// app.use(`${process.env.PUBLIC_CONFIG_PATH}/users`, userRouter);

export { app, server };
