import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    details: { type: Object },
    startDate: { type: Date, default: new Date() },
    // endDate: { type: Date, default: new Date() },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    // invitedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isEventOver: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Events = mongoose.model("Events", eventSchema);
