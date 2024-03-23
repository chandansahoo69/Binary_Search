import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createEvent, getEvents } from "../controllers/event.controller.js";

const router = Router();

router.post("/create-event", verifyJWT, createEvent);
router.get("/get-events", verifyJWT, getEvents);

export default router;
