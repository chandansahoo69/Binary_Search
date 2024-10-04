import { Router } from "express";
import {
  createRoom,
  getRoom,
  getRooms,
  startWar,
  testingConnection,
  compileCode,
  submitCode,
} from "../controllers/room.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/testing", testingConnection);
router.post("/create-room", verifyJWT, createRoom);
router.get("/get-rooms", verifyJWT, getRooms);
router.get("/get-room/:id", verifyJWT, getRoom);

router.post("/start-war", verifyJWT, startWar);
router.post("/compile-code", verifyJWT, compileCode);
router.post("/submit-code", verifyJWT, submitCode);

export default router;
