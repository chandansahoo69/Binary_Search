import { Router } from "express";
import {
  addQuestion,
  getQuestions,
} from "../controllers/question.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/add-question", verifyJWT, addQuestion);
router.get("/get-question", verifyJWT, getQuestions);

export default router;
