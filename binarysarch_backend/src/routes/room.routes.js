import { Router } from "express";
import {
  createRoom,
  getRoom,
  getRooms,
  testingConnection,
} from "../controllers/room.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/testing", testingConnection);
router.post("/create-room", verifyJWT, createRoom);
router.get("/get-rooms", verifyJWT, getRooms);
router.get("/get-room/:id", verifyJWT, getRoom);

export default router;
