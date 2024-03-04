import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["easy", "medium", "hard"],
    },
    tags: [{ type: String, required: true }],
    examples: [
      {
        input: { type: String, required: true },
        output: { type: String, required: true },
        explanation: { type: String, required: true },
      },
    ],
    answers: [{ type: String }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Question = mongoose.model("Question", questionSchema);
