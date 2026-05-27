import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function QuestionPage() {
    

    const navigate=useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answerText, setAnswerText] = useState({});

  useEffect(() => {
  const storedQuestions =
    JSON.parse(localStorage.getItem("questions")) || [];

  console.log("Stored Questions:", storedQuestions);

  setQuestions(storedQuestions);
}, []);

  const unresolvedQuestions =
  questions.filter(
    (q) => q.status !== "resolved"
  );

  const submitAnswer = (questionId) => {

    if (!answerText[questionId]?.trim()) return;

    const updatedQuestions = questions.map((q) => {

      if (q.id === questionId) {

        return {
          ...q,

          answers: [
            ...q.answers,

            {
              id: Date.now(),
              text: answerText[questionId]
            }
          ]
        };
      }

      return q;
    });

    setQuestions(updatedQuestions);

    localStorage.setItem(
      "questions",
      JSON.stringify(updatedQuestions)
    );

    setAnswerText({
      ...answerText,
      [questionId]: ""
    });
  };

  const verifyQuestion = (questionId) => {

    const updatedQuestions = questions.map((q) => {

      if (q.id === questionId) {

        return {
          ...q,
          verified: true
        };
      }

      return q;
    });

    setQuestions(updatedQuestions);

    localStorage.setItem(
      "questions",
      JSON.stringify(updatedQuestions)
    );
    alert("Question is resoled successfully!")
    navigate("/")
  };

  if (questions.length === 0) {
    return (
      <div className="question-page">

        <h1>No questions to resolve</h1>

      </div>
    );
  }

  if (unresolvedQuestions.length === 0) {
    return (
      <div className="question-page">

        <h1>
          All questions have been resolved ✅
        </h1>

      </div>
    );
  }

  return (
    <div className="question-page">

      <h1>Resolve Questions</h1>

      {unresolvedQuestions.map((question) => (

        <div
          key={question.id}
          className="question-card"
        >

          <h2>{question.question}</h2>

          <p>{question.description}</p>

          <h3>Answers</h3>

          {question.answers.length === 0 ? (

            <p>No answers yet.</p>

          ) : (

            question.answers.map((answer) => (

  <div
    key={answer.id}
    className="answer-card"
  >

    {answer.verified && (

      <span className="verified-badge">
        ✔ Admin Verified
      </span>

    )}

    <p>{answer.text}</p>

  </div>

))
          )}

          <textarea
            rows="4"
            placeholder="Write answer..."

            value={
              answerText[question.id] || ""
            }

            onChange={(e) =>
              setAnswerText({
                ...answerText,
                [question.id]:
                  e.target.value
              })
            }
          />

          <div
            style={{
              display:"flex",
              gap:"10px",
              marginTop:"10px"
            }}
          >

            <button className="submit-answer-btn"
              onClick={() =>
                submitAnswer(question.id)
              }
            >
              Submit Answer
            </button>
            
          </div>
          

        </div>

      ))}

    </div>
  );
}

export default QuestionPage;