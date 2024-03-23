import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    from: { type: Schema.Types.ObjectId, ref: "User" },
    to: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        isRead: {
          type: String,
          enum: ["read", "unread"],
          default: "unread",
        },
      },
    ],
    type: {
      type: String,
      enum: [
        "friend-request",
        "friend-request-accepted",
        "event-invitation",
        "event-reminder",
      ],
    },
    details: { type: Object },
    content: { type: String, required: true },
    showAction: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationSchema);
