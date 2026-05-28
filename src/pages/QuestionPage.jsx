import {
  useEffect,
  useState
} from "react";

function QuestionPage() {

  const [questions, setQuestions] =
    useState([]);

  const [answerText, setAnswerText] =
    useState({});

  /* FETCH QUESTIONS */

  useEffect(() => {

    fetch(
      "http://localhost:5000/questions"
    )

      .then((res) => res.json())

      .then((data) => {

        setQuestions(data);

      })

      .catch((err) => {

        console.log(err);

      });

  }, []);

  /* SHOW ONLY QUESTIONS
     WITHOUT VERIFIED ANSWERS */

  const unresolvedQuestions =
    questions.filter((q) => {

      const hasVerifiedAnswer =
        q.answers?.some(
          (a) => a.verified
        );

      return !hasVerifiedAnswer;
    });

  /* SUBMIT ANSWER */

  const submitAnswer = async (
    questionId
  ) => {

    if (
      !answerText[questionId]?.trim()
    ) {
      return;
    }

    try {

      const response =
        await fetch(

          `http://localhost:5000/questions/${questionId}/answer`,

          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({

              text:
                answerText[questionId]

            })

          }
        );

      const data =
        await response.json();

      alert(data.message);
      /* REMOVE QUESTION
         AFTER SUBMIT */

      const updatedQuestions =
        questions.filter(
          (q) =>
            q.id !== questionId
        );

      setQuestions(
        updatedQuestions
      );

    } catch (error) {

      console.log(error);

    }
  };

  /* EMPTY STATE */

  if (
    unresolvedQuestions.length === 0
  ) {

    return (

      <div className="question-page">

        <div className="empty-state">

          <h2>
            No Questions To Resolve
          </h2>

          <p>
            All community questions
            are currently answered.
          </p>

        </div>

      </div>

    );
  }

  return (

    <div className="question-page">

      <h1>
        Resolve Questions
      </h1>

      {unresolvedQuestions.map(
        (question) => (

          <div
            key={question.id}
            className="question-card"
          >

            {/* QUESTION */}

            <h2>
              {question.question}
            </h2>

            <p>
              {question.description}
            </p>

            {/* ANSWER BOX */}

            <textarea

              rows="5"

              placeholder=
              "Write your answer..."

              value={
                answerText[
                  question.id
                ] || ""
              }

              onChange={(e) =>

                setAnswerText({

                  ...answerText,

                  [question.id]:
                    e.target.value

                })

              }
            />

            {/* SUBMIT BUTTON */}

            <button

              className=
              "submit-answer-btn"

              onClick={() =>

                submitAnswer(
                  question.id
                )

              }
            >

              Submit Answer

            </button>

          </div>

        )
      )}

    </div>

  );
}

export default QuestionPage;