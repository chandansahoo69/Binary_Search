import { RoomSchema } from "../models/room.modal.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendNotification } from "../utils/notification.js";
import { getIO } from "../utils/socket.js";
import { generateQuestions } from "./question.controller.js";

const testingConnection = asyncHandler(async (req, res) => {
  const io = getIO();

  console.log("io", io);
  res.status(200).json({ success: true, data: "Connection Successful" });
});

const createRoom = asyncHandler(async (req, res) => {
  const {
    title,
    type,
    startDate,
    noOfUsers,
    noOfQuestions,
    difficultyLevel,
    challangeTime,
    invitedUsers,
  } = req.body;

  try {
    const questionIds = await generateQuestions(difficultyLevel, noOfQuestions);

    const room = await RoomSchema.create({
      title,
      type,
      startDate,
      noOfUsers,
      difficultyLevel,
      challangeTime,
      questions: questionIds,
      createdBy: req.user._id,
      invitedUsers,
    });

    if (type === "private") {
      // send real-time notification to user

      const roomDetails = {
        _id: room._id,
        title,
        difficultyLevel,
        challangeTime,
        startDate,
        noOfUsers,
        createdBy: req.user._id,
      };

      sendNotification(
        invitedUsers,
        req.user._id,
        `You have been invited to join a room.`,
        "event-invitation",
        roomDetails,
        "notification"
      );
    }

    return res
      .status(200)
      .json({ success: true, data: "Room created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: "Internal server error" });
  }
});

const getRooms = asyncHandler(async (req, res) => {
  try {
    const rooms = await RoomSchema.find()
      .select(
        "-connectedUsers -point -questions -invitedUsers -ranks -messages"
      )
      .populate("createdBy", "-password -refreshToken");

    return res.status(200).json({ success: true, data: rooms });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: "Internal server error" });
  }
});

const getRoom = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const room = await RoomSchema.findById(id).select(
      "-connectedUsers -point -invitedUsers -ranks -messages -questions"
    );

    res.status(200).json({ success: true, data: room });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: "Internal server error" });
  }
});

export { testingConnection, createRoom, getRooms, getRoom };
