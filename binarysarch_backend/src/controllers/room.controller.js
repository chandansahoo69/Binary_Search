import { RoomSchema } from "../models/room.modal.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getIO } from "../utils/socket.js";
import { generateQuestions } from "./question.controller.js";

const testingConnection = asyncHandler(async (req, res) => {
  //   getIO().emit(
  //     "testing",
  //     "Connection Successful with socket id->>>> " + socket.id
  //   );
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
  } = req.body;

  try {
    console.log("req.user", req.body);
    const questionIds = await generateQuestions(difficultyLevel, noOfQuestions);

    console.log("questionIds", questionIds);

    const room = await RoomSchema.create({
      title,
      type,
      startDate,
      noOfUsers,
      difficultyLevel,
      challangeTime,
      questions: questionIds,
      createdBy: req.user._id,
    });

    // console.log("room created successfully", room);

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
    const room = await RoomSchema.findById(id).select("-connectedUsers -point");

    res.status(200).json({ success: true, data: room });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: "Internal server error" });
  }
});

export { testingConnection, createRoom, getRooms, getRoom };
