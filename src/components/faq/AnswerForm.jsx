import { useState } from "react";

function AnswerForm({ questionId, onAnswerAdded }) {

  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {

    if (!answer.trim()) return;

    const questions =
      JSON.parse(localStorage.getItem("questions")) || [];

    const updatedQuestions =
      questions.map((q) => {

        if (q.id === questionId) {

          return {
            ...q,

            answers: [
              ...(q.answers || []),

              {
                id: Date.now(),
                text: answer,
                upvotes: 0,
                downvotes: 0,
                verified: false
              }
            ]
          };
        }

        return q;
      });

    localStorage.setItem(
      "questions",
      JSON.stringify(updatedQuestions)
    );

    setAnswer("");

    onAnswerAdded();
  };

  return (
    <div>

      <textarea
        value={answer}
        onChange={(e) =>
          setAnswer(e.target.value)
        }
        placeholder="Write your answer..."
      />

      <button onClick={handleSubmit}>
        Submit Answer
      </button>

    </div>
  );
}

export default AnswerForm;