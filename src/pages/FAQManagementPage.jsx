import { useEffect, useState } from "react";

function FAQManagementPage() {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {

    const storedQuestions =
      JSON.parse(
        localStorage.getItem("questions")
      ) || [];

    setQuestions(storedQuestions);

  }, []);

  const verifyAnswer = (
    questionId,
    answerId
  ) => {

    const updatedQuestions =
      questions.map((question) => {

        if (
          question.id === questionId
        ) {

          return {

            ...question,
            status:"resolved",

            verified: true,

            answers:
              question.answers.map(
                (answer) => ({

                  ...answer,

                  verified:
                    answer.id === answerId

                })
              )

          };
        }

        return question;
      });

    localStorage.setItem(
      "questions",
      JSON.stringify(updatedQuestions)
    );

    setQuestions(updatedQuestions);

    alert(
      "Answer verified successfully!"
    );
  };

  return (
    <div className="page-wrapper">

      <h1>
        Admin Moderation Dashboard
      </h1>

      {questions.length === 0 ? (

        <p>
          No questions available
        </p>

      ) : (

        questions.map((question) => (

          <div
            key={question.id}
            className="question-card"
          >

            <h2>
              {question.question}
            </h2>

            <p>
              {question.description}
            </p>

            <h3>
              Submitted Answers
            </h3>

            {question.answers.length === 0 ? (

              <p>
                No answers submitted yet
              </p>

            ) : (

              question.answers.map(
                (answer) => (

                  <div
                    key={answer.id}
                    className="answer-card"
                  >

                    {answer.verified && (

                      <span
                        className="verified-badge"
                      >
                        ✔ Verified
                      </span>

                    )}

                    <p>
                      {answer.text}
                    </p>

                    {!answer.verified && (

                      <button
                        className="approve-btn"
                        onClick={() =>
                          verifyAnswer(
                            question.id,
                            answer.id
                          )
                        }
                      >
                        Verify Answer
                      </button>

                    )}

                  </div>

                )
              )
            )}

          </div>

        ))

      )}

    </div>
  );
}

export default FAQManagementPage;