import { Events } from "../models/event.modal.js";
import { Notification } from "../models/notification.modal.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getEvents = asyncHandler(async (req, res) => {
  try {
    const { month } = req.params;

    const numericMonth = parseInt(month, 10);

    const events = await Events.find({
      $expr: {
        $eq: [{ $month: "$startDate" }, numericMonth],
      },
      owner: req.user._id,
    }).sort({ startDate: 1 });

    return res.status(200).json({
      success: true,
      data: events,
      message: "Events fetched successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: "Internal server error" });
  }
});

const createEvent = asyncHandler(async (req, res) => {
  try {
    const { title, details, type, startDate, creator, notficationId } =
      req.body;

    await Events.create({
      title,
      details,
      type,
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
