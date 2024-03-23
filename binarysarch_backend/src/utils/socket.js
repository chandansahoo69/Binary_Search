import { Server } from "socket.io";
import { initializedRoomSocket } from "../socket/room.socketTest.js";
// import { initializedRoomSocket } from "../socket/room.socket.js";

let io;
let socket;

const initializeSocket = (server, options) => {
  io = new Server(server, {
    cors: options.cors,
    // path: options.path,
  });

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    socket.on("joinNotification", (userId) => {
      socket.join(userId);
    });

    socket.on("leaveNotification", (userId) => {
      socket.leave(userId);
    });

    initializedRoomSocket(socket);

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket not initialized!");
  }

  return io;
};

const setSocket = (socketInstance) => {
  socket = socketInstance;
};

const getSocket = () => {
  if (!socket) {
    throw new Error("Socket not initialized!");
  }

  return socket;
};

export { getIO, getSocket, setSocket, initializeSocket };
