import { useState } from "react";
import { Link } from "react-router-dom";

import SearchBar from "../components/faq/SearchBar";
import CategoryCard from "../components/faq/CategoryCard";

import { faqData } from "../data/mockFaqs";

function QueryPage() {
  const [search, setSearch] = useState("");

  const filteredFaqs = faqData.map((category) => ({
    ...category,
    faqs: category.faqs.filter((faq) =>
      faq.question
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  }));

  const noResults = filteredFaqs.every(
    (category) => category.faqs.length === 0
  );

  // Community Questions from localStorage
  const questions =
    JSON.parse(localStorage.getItem("questions")) || [];

  const resolvedQuestions =
    questions.filter(
      (q) => q.status === "resolved"
    );

  return (
    <div className="faq-page">

      {/* Hero Section */}

      <div className="hero">

        <h1>Frequently Asked Questions</h1>

        <p>
          Find answers to commonly asked questions
        </p>

        <div className="search-section">

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          <Link
            to="/post-query"
            className="ask-question-btn"
          >
            + Ask Question
          </Link>

        </div>

      </div>

      {/* Resolve Question Card */}

      <div className="resolve-card">

        <div>

          <h2>Resolve a Question</h2>

          <p>
            Help fellow students by answering
            unresolved community questions.
          </p>

        </div>

        <Link
          to="/question"
          className="resolve-btn"
        >
          Resolve Questions
        </Link>

      </div>

      {/* FAQ Grid */}

      {!noResults ? (

        <div className="faq-grid">

          {filteredFaqs.map(
            (category) =>
              category.faqs.length > 0 && (
                <CategoryCard
                  key={category.id}
                  category={category}
                />
              )
          )}

        </div>

      ) : (

        <div className="ask-card">

          <h2>No matching FAQ found</h2>

          <p>
            Can't find what you're looking for?
          </p>

          <Link
            to="/post-query"
            className="ask-btn"
          >
            Ask a New Question
          </Link>

        </div>

      )}

      {/* Resolved Questions Section */}

      {resolvedQuestions.length > 0 && (

        <div className="resolved-section">

          <h2>
            Resolved Community Questions
          </h2>

          {resolvedQuestions.map((question) => (

            <div
              key={question.id}
              className="resolved-card"
            >

              <h3>
                {question.question}
              </h3>

              <p>
                {question.description}
              </p>

              {question.answers &&
                question.answers.map(
                  (answer) =>

                    answer.verified && (

                      <div
                        key={answer.id}
                        className="answer-card"
                      >

                        <span
                          className="verified-badge"
                        >
                          ✔ Admin Verified
                        </span>

                        <p>
                          {answer.text}
                        </p>

                      </div>

                    )
                )}

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default QueryPage;