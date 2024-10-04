import { Events } from "../models/event.modal.js";
import { Question } from "../models/question.modal.js";
import { RoomSchema } from "../models/room.modal.js";
import { getRoomUserMapping } from "../socket/room.socketTest.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendNotification } from "../utils/notification.js";
import { getIO } from "../utils/socket.js";
import { generateQuestions } from "./question.controller.js";
import Axios from "axios";

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

    const roomDetails = {
      _id: room._id,
      title,
      difficultyLevel,
      challangeTime,
      startDate,
      noOfUsers,
      createdBy: req.user._id,
    };

    await Events.create({
      title,
      details: roomDetails,
      type: "event-invitation",
      startDate,
      createdBy: req.user._id,
      owner: req.user._id,
    });

    if (type === "private") {
      // send real-time notification to user

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
    console.log(error);
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
    let room = await RoomSchema.findById(id).select(
      "-connectedUsers -point -invitedUsers -ranks -messages -questions"
    );

    if (room.isWarStarted) {
      room = await RoomSchema.findById(id)
        .select("-connectedUsers -point -invitedUsers -ranks -messages")
        .populate("questions");
    }

    res.status(200).json({ success: true, data: room });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: "Internal server error" });
  }
});

const startWar = asyncHandler(async (req, res) => {
  try {
    const { roomId, userId } = req.body;

    const room = await RoomSchema.findById(roomId);
    console.log("start war users", room.createdBy.toString(), userId);
    if (room.createdBy.toString() !== userId) {
      return res
        .status(401)
        .json({ success: false, data: "You are unauthorized to start." });
    }

    if (!room.isWarStarted) {
      room.isWarStarted = true;
      room.warStartTime = new Date();
      await room.save();
    }

    const updatedRoom = await RoomSchema.findById(roomId)
      .select("-connectedUsers -point -invitedUsers -ranks -messages")
      .populate("questions");

    const io = getIO();
    io.to(roomId).emit("war-started", `War stared by ${userId}`, updatedRoom);

    return res
      .status(200)
      .json({ success: true, data: updatedRoom, message: "War started" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, data: "Internal server error" });
  }
});

const checkCodeStatus = async (token) => {
  const options = {
    method: "GET",
    url: `${process.env.RAPID_API_URL}/${token}`,
    params: { base64_encoded: "true", fields: "*" },
    headers: {
      "X-RapidAPI-Host": process.env.RAPID_API_HOST,
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
    },
  };

  try {
    const response = await Axios.request(options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const compileCodeOnAPI = async (
  language_id,
  source_code,
  stdin,
  expected_output
) => {
  const encoded_data = {
    language_id,
    source_code: btoa(source_code),
    stdin: btoa(stdin),
    // expected_output: btoa(expected_output),
  };
  const options = {
    method: "POST",
    url: process.env.RAPID_API_URL,
    params: { base64_encoded: "true", fields: "*" },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Host": process.env.RAPID_API_HOST,
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
    },
    data: encoded_data,
  };

  try {
    const response = await Axios.request(options);
    return response;
  } catch (error) {
    throw error;
  }
};

function takeTime(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

const compileCode = asyncHandler(async (req, res) => {
  try {
    const { code, language, input, questionId } = req.body;

    let language_id = 54;
    if (language === "python") {
      language_id = 34;
    } else if (language === "java") {
      language_id = 91;
    } else if (language === "c++") {
      language_id = 54;
    }

    const question = await Question.findById(questionId);

    const response = await compileCodeOnAPI(language_id, code, input);

    // Sometimes after compilation of code, the compiled_token does not fetch data, so here we call checkCode until we get result
    let check_response = null;
    while (check_response == null || check_response.status.id == 2) {
      await takeTime(500);
      check_response = await checkCodeStatus(response.data.token);
    }

    console.log("code response", atob(check_response.stdout), question.answers);

    let output =
      check_response.stdout === "" ? "null" : atob(check_response.stdout);
    let message =
      output !== "null" ? "Code compiled successfully" : "Compilation error";

    return res
      .status(200)
      .json({ success: true, data: output, message: message });
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ success: false, data: "Internal server error" });
  }
});

const submitCode = asyncHandler(async (req, res) => {
  try {
    const { code, language, input, questionId, roomId } = req.body;
    console.log(language, input, questionId);

    let language_id = 54;
    if (language === "python") {
      language_id = 34;
    } else if (language === "java") {
      language_id = 91;
    } else if (language === "c++") {
      language_id = 54;
    }

    const question = await Question.findById(questionId);

    const response = await compileCodeOnAPI(language_id, code, input);

    // Sometimes after compilation of code, the compiled_token does not fetch data, so here we call checkCode until we get result
    let check_response = null;
    while (check_response == null || check_response.status.id == 2) {
      await takeTime(500);
      check_response = await checkCodeStatus(response.data.token);
    }

    console.log("code response", atob(check_response.stdout), question.answers);

    console.log("room users", getRoomUserMapping());

    return res
      .status(200)
      .json({ success: true, data: "data", message: "Code compiled" });
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ success: false, data: "Internal server error" });
  }
});

export {
  testingConnection,
  createRoom,
  getRooms,
  getRoom,
  startWar,
  compileCode,
  submitCode,
};
