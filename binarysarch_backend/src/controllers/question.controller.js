import { Question } from "../models/question.modal.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addQuestion = asyncHandler(async (req, res) => {
  try {
    const { title, description, difficulty, tags, examples, answers } =
      req.body;

    if (
      !title ||
      !description ||
      !difficulty ||
      !tags ||
      !examples ||
      !answers
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    await Question.create({
      title,
      description,
      difficulty,
      tags,
      examples,
      answers,
      createdBy: req.user._id,
    });

    return res
      .status(200)
      .json({ success: true, message: "Question added successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: "Internal server error" });
  }
});

const getQuestions = asyncHandler(async (req, res) => {
  const { questionId } = req.body;

  const question = await Question.findOne({ _id: questionId });

  return res.status(200).json({ success: true, data: question });
});

const generateQuestions = async (questionType, noOfQuestions) => {
  try {
    const allQuestions = await Question.find({ difficulty: questionType });

    const selectedQuestionsIds = [];
    const selectedQuestions = new Set();

    while (selectedQuestionsIds.length < noOfQuestions) {
      const randomIndex = Math.floor(Math.random() * allQuestions.length);
      const randomQuestion = allQuestions[randomIndex];

      if (!selectedQuestions.has(randomQuestion._id)) {
        selectedQuestions.add(randomQuestion._id);
        selectedQuestionsIds.push(randomQuestion._id);
      }
    }

    return selectedQuestionsIds;
  } catch (error) {}
};

export { addQuestion, getQuestions, generateQuestions };
