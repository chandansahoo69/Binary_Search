import mongoose, { Schema } from "mongoose";

const connectedUserSchema = new Schema({
  socketId: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const roomSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["public", "private"],
    },
    startDate: { type: Date, default: new Date() },
    noOfUsers: { type: Number, default: 0 },
    difficultyLevel: { type: String, required: true },
    challangeTime: { type: Number, required: true },
    point: { type: Number, default: 10 },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    isContestOver: { type: Boolean, default: false },
    connectedUsers: [connectedUserSchema],
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    invitedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    ranks: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        noOfQuestionsSolved: { type: Number },
        totalTime: { type: Number },
      },
    ],
    messages: [
      {
        sender: { type: Schema.Types.ObjectId, ref: "User" },
        message: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const RoomSchema = mongoose.model("Room", roomSchema);
