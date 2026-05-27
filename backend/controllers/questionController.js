const fs = require("fs");
const path = require("path");

const filePath = path.join(
  __dirname,
  "../data/questions.json"
);

/* GET QUESTIONS */

const getQuestions = (req, res) => {

  const data =
    JSON.parse(
      fs.readFileSync(filePath)
    );

  res.json(data);
};

/* ADD QUESTION */

const addQuestion = (req, res) => {

  const questions =
    JSON.parse(
      fs.readFileSync(filePath)
    );

  const newQuestion = {
    id: Date.now(),

    question: req.body.question,

    description:
      req.body.description,

    category:
      req.body.category,

    status: "unresolved",

    answers: []
  };

  questions.push(newQuestion);

  fs.writeFileSync(
    filePath,
    JSON.stringify(
      questions,
      null,
      2
    )
  );

  res.json({
    message:
    "Question added successfully"
  });
};

/* ADD ANSWER */

const addAnswer = (req, res) => {

  const questions =
    JSON.parse(
      fs.readFileSync(filePath)
    );

  const updatedQuestions =
    questions.map((q) => {

      if (
        q.id == req.params.id
      ) {

        q.answers.push({

          id: Date.now(),

          text: req.body.text,

          verified: false
        });
      }

      return q;
    });

  fs.writeFileSync(
    filePath,
    JSON.stringify(
      updatedQuestions,
      null,
      2
    )
  );

  res.json({
    message:
    "Answer submitted"
  });
};

/* VERIFY ANSWER */

const verifyAnswer = (req, res) => {

  const questions =
    JSON.parse(
      fs.readFileSync(filePath)
    );

  const updatedQuestions =
    questions.map((q) => {

      if (
        q.id == req.params.questionId
      ) {

        q.status = "resolved";

        q.answers =
          q.answers.map(answer => ({

            ...answer,

            verified:
              answer.id ==
              req.params.answerId
          }));
      }

      return q;
    });

  fs.writeFileSync(
    filePath,
    JSON.stringify(
      updatedQuestions,
      null,
      2
    )
  );

  res.json({
    message:
    "Answer verified"
  });
};

module.exports = {

  getQuestions,

  addQuestion,

  addAnswer,

  verifyAnswer
};