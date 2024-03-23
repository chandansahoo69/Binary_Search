import { Events } from "../models/event.modal.js";
import { Notification } from "../models/notification.modal.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getEvents = asyncHandler(async (req, res) => {
  try {
    const events = await Events.find({
      owner: req.user._id,
    })
      .populate({ path: "createdBy", select: "username avatar" })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: "Internal server error" });
  }
});

const createEvent = asyncHandler(async (req, res) => {
  try {
    const { title, details, startDate, creator, notficationId } = req.body;
    console.log("req.body", req.body);
    await Events.create({
      title,
      details,
      startDate,
      createdBy: creator,
      owner: req.user._id,
    });

    const notification = await Notification.findByIdAndUpdate(
      notficationId,
      { showAction: false },
      { new: true }
    )
      .populate({ path: "from", select: "username avatar" })
      .select("-to");

    console.log("notification", notification);

    return res.status(200).json({
      success: true,
      data: notification,
      message: "Event created successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: "Internal server error" });
  }
});

export { getEvents, createEvent };
