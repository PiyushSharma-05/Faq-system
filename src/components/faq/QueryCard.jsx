import { useState } from "react";

function QueryCard({ faq, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="accordion">

      <button
        className="accordion-btn"
        onClick={() => setOpen(!open)}
      >
        <span>
          {index + 1}. {faq.question}
        </span>

        <span>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="accordion-content">
          {faq.answer}
        </div>
      )}

    </div>
  );
}

export default QueryCard;