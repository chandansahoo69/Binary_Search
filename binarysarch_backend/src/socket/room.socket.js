import mongoose from "mongoose";
import { RoomSchema } from "../models/room.modal.js";
import { getIO, getSocket } from "../utils/socket.js";

const initializedRoomSocket = () => {
  const io = getIO();
  const socket = getSocket();

  io.emit("krishna", "Testing different features: " + socket.id);

  // Feature-specific logic for the room
  socket.on("joinRoom", async (roomId, userId) => {
    // console.log(`User ${userId} joined room ${roomId}`);

    try {
      const room = await RoomSchema.findById(roomId);

      if (!room) {
        return io.emit(
          "error",
          "Room not found with the given id. Please try again."
        );
      }

      // Check if the user is already in the room
      const userInRoom = room.connectedUsers.find(
        (user) => user.userId.toString() === userId
      );

      // If the user is not in the room, push the user to the connectedUsers array
      if (!userInRoom) {
        room.connectedUsers.push({ userId, socketId: socket.id });
        await room.save();
      }

      // room is a array of object while using aggregate function
      const roomDetails = await RoomSchema.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(roomId),
          },
        },
        {
          $lookup: {
            from: "users",
            let: {
              connected_user: "$connectedUsers",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ["$_id", "$$connected_user.userId"],
                  },
                },
              },
              {
                $project: {
                  username: 1,
                  email: 1,
                  fullname: 1,
                  avatar: 1,
                  coverImage: 1,
                },
              },
            ],
            as: "userDetails",
          },
        },
      ]);

      socket.join(roomId);

      console.log(
        "room",
        roomDetails[0]?.connectedUsers,
        roomDetails[0]?.userDetails
      );

      io.emit("success", `You joined room ${roomId}`);

      io.to(roomId).emit(
        "update",
        `User ${userId} joined the room`,
        roomDetails[0]?.userDetails
      );
    } catch (error) {
      console.log("Error while joining room: ", error);
      return io.emit("error", "Something went wrong while joining the room");
    }
  });

  socket.on("sendMessage", (roomId, message) => {
    console.log(`User sent message in room ${roomId}: ${message}`);
    // Add logic for sending a message in a room
  });

  // Add more room-related event handlers...

  // Handle disconnect logic for the room feature
  socket.on("disconnect", async () => {
    console.log("User disconnected from room feature", socket.id);

    try {
      console.log("check 1");
      //   const room = await RoomSchema.find({
      //     connectedUsers: {
      //       socketId: { $in: [socket.id] },
      //     },
      //   });

      const room = await RoomSchema.aggregate([
        {
          $match: {
            connectedUsers: {
              $elemMatch: {
                socketId: socket.id,
              },
            },
          },
        },
      ]);

      console.log("check 1", room);

      console.log("check 2", room?.connectedUsers);

      if (!room) {
        return;
      }

      const user = room.connectedUsers.find(
        (user) => user.socketId === socket.id
      );

      console.log("check 3", user);

      if (!user) {
        return;
      }

      const userId = user.userId.toString();

      console.log("socket id to be removed", socket.id);

      room.connectedUsers = room.connectedUsers.filter(
        (user) => user.socketId !== socket.id
      );
      console.log("check 4", room?.connectedUsers);
      await room.save();

      // room is a array of object while using aggregate function
      const roomDetails = await RoomSchema.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(roomId),
          },
        },
        {
          $lookup: {
            from: "users",
            let: {
              connected_user: "$connectedUsers",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ["$_id", "$$connected_user.userId"],
                  },
                },
              },
              {
                $project: {
                  username: 1,
                  email: 1,
                  fullname: 1,
                  avatar: 1,
                  coverImage: 1,
                },
              },
            ],
            as: "userDetails",
          },
        },
      ]);

      console.log(
        "User left the room",
        roomDetails[0]?.connectedUsers,
        roomDetails[0]?.userDetails
      );

      socket.leave(room._id);

      io.to(room._id).emit(
        "update",
        `User ${userId} left the room`,
        roomDetails[0]?.userDetails
      );
    } catch (error) {
      return io.emit(
        "error",
        "Something went wrong while disconnecting from the room"
      );
    }
  });
};

export { initializedRoomSocket };
