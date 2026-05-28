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

    question:
      req.body.question,

    description:
      req.body.description,

    category:
      req.body.category,

    status: "unresolved",

    upvotes: 0,

    upvotedBy: [],

    addedToFaq: false,

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

const verifyAnswer = (
  req,
  res
) => {

  const questions =
    JSON.parse(
      fs.readFileSync(filePath)
    );

  const updatedQuestions =
    questions.map((q) => {

      if (
        q.id ==
        req.params.questionId
      ) {

        /* QUESTION RESOLVED */

        q.status = "resolved";

        /* VERIFY ONLY
           SELECTED ANSWER */

        q.answers =
          q.answers.map(
            (answer) => ({

              ...answer,

              verified:
                answer.id ==
                req.params.answerId

            })
          );
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

/* UPVOTE QUESTION */

const upvoteQuestion = (
  req,
  res
) => {

  const questions =
    JSON.parse(
      fs.readFileSync(filePath)
    );

  const username =
    req.body.username;

  let alreadyUpvoted = false;

  const updatedQuestions =
    questions.map((q) => {

      if (
        q.id == req.params.id
      ) {

        /* CREATE ARRAY */

        if (!q.upvotedBy) {

          q.upvotedBy = [];
        }

        /* CHECK IF USER
           ALREADY UPVOTED */

        if (
          q.upvotedBy.includes(
            username
          )
        ) {

          alreadyUpvoted = true;

          return q;
        }

        /* ADD USER */

        q.upvotedBy.push(
          username
        );

        /* INCREASE COUNT */

        q.upvotes =
          (q.upvotes || 0) + 1;

        /* FAQ THRESHOLD */

        if (q.upvotes >= 5) {

          q.addedToFaq = true;
        }
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

  /* RESPONSE */

  if (alreadyUpvoted) {

    return res.json({

      message:
        "Already upvoted"

    });
  }

  res.json({

    message:
      "Upvoted successfully"

  });
};

/* DELETE QUESTION */

const deleteQuestion = (
  req,
  res
) => {

  const questions =
    JSON.parse(
      fs.readFileSync(filePath)
    );

  const filteredQuestions =
    questions.filter(

      (q) =>
        q.id != req.params.id

    );

  fs.writeFileSync(

    filePath,

    JSON.stringify(
      filteredQuestions,
      null,
      2
    )
  );

  res.json({

    message:
      "Question deleted successfully"

  });
};


module.exports = {

  getQuestions,

  addQuestion,

  addAnswer,

  verifyAnswer,

  upvoteQuestion
  , deleteQuestion
};