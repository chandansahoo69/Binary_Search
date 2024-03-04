import mongoose, { Schema } from "mongoose";

const requestSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    recipient: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const FriendRequest = mongoose.model("FriendRequest", requestSchema);
