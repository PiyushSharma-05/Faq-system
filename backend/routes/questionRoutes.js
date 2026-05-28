const express = require("express");

const router = express.Router();

const {

  getQuestions,

  addQuestion,

  addAnswer,

  verifyAnswer,upvoteQuestion , deleteQuestion

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
router.put(
  "/:id/upvote",
  upvoteQuestion
);
router.delete(
  "/:id",
  deleteQuestion
);


module.exports = router;