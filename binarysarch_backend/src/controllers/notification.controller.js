import { Notification } from "../models/notification.modal.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getNotifications = asyncHandler(async (req, res) => {
  try {
    const notifications = await Notification.find({
      "to.userId": req.user._id,
    })
      .populate({ path: "from", select: "username avatar" })
      .select("-to")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: "Internal server error" });
  }
});

export { getNotifications };
