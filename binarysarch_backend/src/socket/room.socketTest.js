import { getIO } from "../utils/socket.js";

// Define a map to store users by room ID
let roomUserMapping = {};

const initializedRoomSocket = (socket) => {
  const io = getIO();

  //   io.emit("krishna", "Testing different features: " + socket.id);

  socket.on("joinRoom", async (roomId, user) => {
    console.log("joinRoom", roomId, user?.username);

    try {
      socket.join(roomId);

      if (!roomUserMapping[roomId]) {
        roomUserMapping[roomId] = [];
      }
      roomUserMapping[roomId].push({ id: socket.id, user });

      socket.roomId = roomId;

      console.log("All users in room: ", roomUserMapping);

      io.to(roomId).emit(
        "update",
        `User ${user?.username} joined the room`,
        roomUserMapping[roomId].map(({ user }) => user)
      );
    } catch (error) {
      console.log("Error while joining room: ", error);
      return io.emit("error", "Something went wrong while joining the room");
    }
  });

  socket.on("disconnect", async () => {
    try {
      const roomId = socket.roomId;
      const usersInRoom = roomUserMapping[roomId];
      if (usersInRoom) {
        // Find the index of the user in the roomUserMapping and remove it
        const index = usersInRoom.findIndex(({ id }) => id === socket.id);
        if (index !== -1) {
          const { user } = usersInRoom.splice(index, 1)[0];

          socket.leave(roomId);

          io.to(roomId).emit(
            "update",
            `User ${user?.username} left the room`,
            usersInRoom.map(({ user }) => user)
          );

          console.log("All users in room after disconnect: ", roomUserMapping);
        }
      }
    } catch (error) {
      return io.emit(
        "error",
        "Something went wrong while disconnecting from the room"
      );
    }
  });
};

export { initializedRoomSocket };
