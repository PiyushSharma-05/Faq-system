import { useEffect, useState } from "react";

function FAQManagementPage() {

  const [questions, setQuestions] =
    useState([]);

  /* GET LOGGED IN USER */

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

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

  /* VERIFY ANSWER */

  const verifyAnswer = async (
    questionId,
    answerId
  ) => {

    try {

      const response =
        await fetch(

          `http://localhost:5000/questions/${questionId}/verify/${answerId}`,

          {
            method: "PUT"
          }

        );

      const data =
        await response.json();

      alert(data.message);

      window.location.reload();

    } catch (error) {

      console.log(error);

    }
  };

  /* ADMIN PROTECTION */

  if (
    !user ||
    user.role !== "admin"
  ) {

    return (

      <div className="page-wrapper">

        <div className="empty-state">

          <h1>
            Access Denied
          </h1>

          <p>
            Only admins can access
            this dashboard.
          </p>

        </div>

      </div>

    );
  }

  const deleteQuestion = async (
  questionId
) => {

  const confirmDelete =
    window.confirm(
      "Delete this question?"
    );

  if(!confirmDelete) return;

  try {

    const response =
      await fetch(

        `http://localhost:5000/questions/${questionId}`,

        {
          method:"DELETE"
        }
      );

    const data =
      await response.json();

    alert(data.message);

    window.location.reload();

  } catch(error){

    console.log(error);

  }
};
  return (

    <div className="page-wrapper">

      <h1>
        Admin Moderation Dashboard
      </h1>

      {/* EMPTY STATE */}

      {questions.length === 0 ? (

        <div className="empty-state">

          <h2>
            No Questions Available
          </h2>

        </div>

      ) : (

        questions.map((question) => (

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

            <p>

              <strong>
                Category:
              </strong>

              {" "}

              {question.category}

            </p>

            <p>

              <strong>
                Status:
              </strong>

              {" "}

              {question.status}

            </p>

            <h3>
              Submitted Answers
            </h3>

            {/* NO ANSWERS */}

            {!question.answers ||
            question.answers.length === 0 ? (

              <p className="no-answer">

                No answers submitted yet.

              </p>

            ) : (

              question.answers.map(
                (answer) => (

                  <div
                    key={answer.id}
                    className="answer-card"
                  >

                    {/* VERIFIED BADGE */}

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

                    {/* VERIFY BUTTON */}

                    {!answer.verified && (

                      <button

                        className=
                        "approve-btn"

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
                    <button

                className="delete-btn"
                onClick={() =>
                  deleteQuestion(question.id)
                }
              >
                Delete Question
              </button>

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