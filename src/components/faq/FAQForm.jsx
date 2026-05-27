import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FAQForm() {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!question.trim() || !category || !description.trim()) {
      alert("Please fill all fields");
      return;
    }

    // Get existing questions
    const existingQuestions =
      JSON.parse(localStorage.getItem("questions")) || [];

    // Create new question object
    const newQuestion = {
      id: Date.now(),
      question,
      category,
      description,
      verified: false,
      answers: [],
      createdAt: new Date().toLocaleString()
    };

    // Save to localStorage
    localStorage.setItem(
      "questions",
      JSON.stringify([...existingQuestions, newQuestion])
    );

    alert("Query submitted successfully!");

    // Clear form
    setQuestion("");
    setCategory("");
    setDescription("");

    // Navigate to faq page
    navigate("/");
  };

  return (
    <div className="form-container">
      <h2>Submit a New Question</h2>

      <form className="faq-form" onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Question Title"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Choose Category</option>

          <option value="Onboarding & Admin">
            Onboarding & Admin
          </option>

          <option value="Tech Support">
            Tech Support
          </option>

          <option value="Internship Queries">
            Internship Queries
          </option>

          <option value="Placements">
            Placements
          </option>

          <option value="Academics">
            Academics
          </option>

          <option value="Certificates">
            Certificates
          </option>
        </select>

        <textarea
          rows="6"
          placeholder="Describe your question..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">
          Submit Question
        </button>

      </form>
    </div>
  );
}

export default FAQForm;