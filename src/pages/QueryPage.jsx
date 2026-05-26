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

  return (
    <div className="faq-page">

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

    </div>
  );
}

export default QueryPage;