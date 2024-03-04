import { Server } from "socket.io";
import { initializedRoomSocket } from "../socket/room.socketTest.js";
// import { initializedRoomSocket } from "../socket/room.socket.js";

let io;
let socket;
let roomUserMapping = {};

const initializeSocket = (server, options) => {
  io = new Server(server, {
    cors: options.cors,
    // path: options.path,
  });

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    initializedRoomSocket(socket);

    // socket.on("joinRoom", async (roomId, user) => {
    //   console.log("joinRoom", roomId, user?.username);

    //   try {
    //     socket.join(roomId);
    //     if (!roomUserMapping[roomId]) {
    //       roomUserMapping[roomId] = [];
    //     }
    //     roomUserMapping[roomId].push({ id: socket.id, user });

    //     socket.roomId = roomId;

    //     console.log("All users in room: ", roomUserMapping);

    //     io.to(roomId).emit(
    //       "update",
    //       `User ${user?.username} joined the room`,
    //       roomUserMapping[roomId].map(({ user }) => user)
    //     );
    //   } catch (error) {
    //     console.log("Error while joining room: ", error);
    //     return io.emit("error", "Something went wrong while joining the room");
    //   }
    // });

    // socket.on("disconnect", async () => {
    //   try {
    //     const roomId = socket.roomId;
    //     const usersInRoom = roomUserMapping[roomId];
    //     if (usersInRoom) {
    //       // Find the index of the user in the roomUserMapping and remove it
    //       const index = usersInRoom.findIndex(({ id }) => id === socket.id);
    //       if (index !== -1) {
    //         const { user } = usersInRoom.splice(index, 1)[0];

    //         socket.leave(roomId);

    //         io.to(roomId).emit(
    //           "update",
    //           `User ${user?.username} left the room`,
    //           usersInRoom.map(({ user }) => user)
    //         );

    //         console.log(
    //           "All users in room after disconnect: ",
    //           roomUserMapping
    //         );
    //       }
    //     }
    //   } catch (error) {
    //     return io.emit(
    //       "error",
    //       "Something went wrong while disconnecting from the room"
    //     );
    //   }
    // });
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
