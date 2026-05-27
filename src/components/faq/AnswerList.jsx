function AnswerList({ answers }) {

  return (
    <div>

      {answers.map((answer) => (

        <div
          key={answer.id}
          className="answer-card"
        >

          {answer.verified && (
            <span>
              ✔ Verified
            </span>
          )}

          <p>{answer.text}</p>

          <div>

            👍 {answer.upvotes}

            👎 {answer.downvotes}

          </div>

        </div>

      ))}
    </div>
  );
}

export default AnswerList;