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
        roomUserMapping[roomId] = new Set();
      }

      // Add the user to the set directly
      roomUserMapping[roomId].add(user);

      socket.roomId = roomId;

      console.log("All users in room after joining: ", roomUserMapping);

      io.to(roomId).emit(
        "update",
        `User ${user?.username} joined the room`,
        Array.from(roomUserMapping[roomId])
      );
    } catch (error) {
      console.log("Error while joining room: ", error);
      return io.emit("error", "Something went wrong while joining the room");
    }
  });

  socket.on("leaveRoom", async (roomId, user) => {
    console.log("leaveRoom", roomId, user?._id);

    try {
      socket.leave(roomId);

      if (roomUserMapping[roomId]) {
        // Find the user object in the set and delete it
        console.log("User to delete: ", roomUserMapping[roomId]);
        roomUserMapping[roomId].forEach((userData) => {
          if (userData._id === user._id) {
            roomUserMapping[roomId].delete(userData);
          }
        });

        // delete the room from the mapping if no users are left
        if (roomUserMapping[roomId].size === 0) {
          delete roomUserMapping[roomId];
        }
      }

      console.log("All users in room after leaving: ", roomUserMapping);

      if (roomUserMapping[roomId]) {
        io.to(roomId).emit(
          "update",
          `User ${user?.username} left the room`,
          Array.from(roomUserMapping[roomId])
        );
      }
    } catch (error) {
      console.log("Error while leaving room: ", error);
      return io.emit("error", "Something went wrong while leaving the room");
    }
  });
};

const getRoomUserMapping = () => {
  return roomUserMapping;
};

export { initializedRoomSocket, getRoomUserMapping };
