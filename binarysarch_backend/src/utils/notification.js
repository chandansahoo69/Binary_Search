import mongoose from "mongoose";
import { Notification } from "../models/notification.modal.js";
import { getIO } from "./socket.js";

const sendNotification = async (
  invitedUsers,
  from,
  content,
  type,
  data,
  eventName
) => {
  const io = getIO();

  try {
    const invitedUsersList = invitedUsers.map((userIdString) => {
      return {
        userId: new mongoose.Types.ObjectId(userIdString),
        isRead: "unread",
      };
    });

    // create a notification
    const notification = new Notification({
      to: invitedUsersList,
      from,
      content,
      details: data,
      type,
    });
    await notification.save();

    console.log("invited users", invitedUsers, eventName);

    invitedUsers.forEach((userId) => {
      io.sockets.in(userId).emit(eventName, {
        from,
        content,
        type,
        data,
      });
    });

    console.log("notification sent");

    // io.emit(eventName, {
    //   invitedUsers,
    //   from,
    //   content,
    //   type,
    // });
  } catch (error) {
    throw error;
  }
};

export { sendNotification };
