const express = require("express");

const router = express.Router();

const {

  getQuestions,

  addQuestion,

  addAnswer,

  verifyAnswer

} = require(
  "../controllers/questionController"
);

/* GET */

router.get(
  "/",
  getQuestions
);

/* POST QUESTION */

router.post(
  "/",
  addQuestion
);

/* POST ANSWER */

router.post(
  "/:id/answer",
  addAnswer
);

/* VERIFY ANSWER */

router.put(
  "/:questionId/verify/:answerId",
  verifyAnswer
);

module.exports = router;