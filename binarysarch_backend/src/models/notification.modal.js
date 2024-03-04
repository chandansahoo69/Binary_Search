import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    from: { type: Schema.Types.ObjectId, ref: "User" },
    to: { type: Schema.Types.ObjectId, ref: "User" },
    type: {
      type: String,
      enum: ["friend-request", "friend-request-accepted"],
    },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationSchema);
