import { useMemo } from "react";
import { createFuse } from "../services/searchService";
import { useState } from "react";
import { Link } from "react-router-dom";

import SearchBar from "../components/faq/SearchBar";
import CategoryCard from "../components/faq/CategoryCard";

// Importing the flat database JSON array
import rawDbData from "../data/ProjectDB.faqs.json";

function QueryPage() {

  const [search, setSearch] = useState("");

  // FAQ CATEGORY STRUCTURE
  const categoryTemplates = [
    { id: 1, title: "Onboarding & Admin", sub: "1. About the internship", sections: ["1"] },
    { id: 2, title: "Onboarding & Admin", sub: "2. Timing and dates", sections: ["2"] },
    { id: 3, title: "NOC", sub: "3. NOC (No Objection Certificate)", sections: ["3"] },
    { id: 4, title: "Offer & Registration", sub: "4. Selection, offer letter, and registration", sections: ["4"] },
    { id: 5, title: "Daily Ops", sub: "5. Work, mentorship, and projects", sections: ["5"] },
    { id: 6, title: "Code of Conduct", sub: "6. Code of conduct — communication channels", sections: ["6"] },
    { id: 7, title: "Interviews", sub: "7. Interviews Related", sections: ["7"] },
    { id: 8, title: "Certificates", sub: "8. Certificate Issuance", sections: ["8"] },
    { id: 9, title: "Rosetta Journal", sub: "9. Rosetta — your internship journal", sections: ["9"] },
    { id: 10, title: "Coursework", sub: "10. Phase 1 — coursework, Vibe LMS, and live sessions", sections: ["10"] },
    { id: 11, title: "Communication Tools", sub: "11. Yaksha Chat Related", sections: ["11"] },
    { id: 12, title: "Tech Support", sub: "12. ViBe Platform", sections: ["12"] },
    { id: 13, title: "Team Formation", sub: "13. Team Formation & Grouping", sections: ["13"] }
  ];

  // STRUCTURED FAQS
  const structuredCategories = useMemo(() => {

    return categoryTemplates.map((cat) => {

      const matchedItems = rawDbData.filter((item) => {

        const questionText =
          item.question?.trim() || "";

        const match =
          questionText.match(/^(\d+)\./);

        if (match) {

          const extractedSection =
            match[1];

          return cat.sections.includes(
            extractedSection
          );
        }

        return false;
      });

      return {

        id: cat.id,

        categoryTitle: cat.title,

        subTitle: cat.sub,

        faqs: matchedItems.map((item) => ({

          id: item.id || item._id?.$oid,

          question: item.question || "",

          answer: item.answer || "",

          categoryTitle: cat.title

        }))
      };
    });

  }, []);

  // FUSE SEARCH
  const fuse = useMemo(() => {
    return createFuse(structuredCategories);
  }, [structuredCategories]);

  // DEFAULT STATE
  let filteredFaqs = structuredCategories;

  let suggestions = [];

  // SEARCH LOGIC
  if (search.trim() !== "") {

    const results = fuse.search(search);

    // STRONG MATCH FILTERING
    const strongResults = results.filter(
      (result) => result.score < 0.35
    );

    const matchedFaqs = strongResults.map(
      (result) => result.item
    );

    suggestions = matchedFaqs;

    filteredFaqs = structuredCategories
      .map((cat) => ({

        ...cat,

        faqs: cat.faqs.filter((faq) =>
          matchedFaqs.some(
            (matched) =>
              matched.id === faq.id
          )
        ),

      }))
      .filter((cat) => cat.faqs.length > 0);
  }

  // NO RESULT STATE
  const noResults =
    search.trim() !== "" &&
    filteredFaqs.length === 0;

  // COMMUNITY QUESTIONS
  const questions =
    JSON.parse(
      localStorage.getItem("questions")
    ) || [];

  const resolvedQuestions =
    questions.filter(
      (q) => q.status === "resolved"
    );

  return (

    <div className="faq-page">

      {/* HERO */}
      <div className="hero">

        <h1>
          Frequently Asked Questions
        </h1>

        <p>
          Find answers to commonly asked questions
        </p>

        {/* SEARCH + ASK BUTTON */}
        <div className="search-section">

          <SearchBar
            search={search}
            setSearch={setSearch}
            suggestions={suggestions}
            onSelectFaq={(faqId) => {

              const element =
                document.getElementById(`faq-${faqId}`);

              if (element) {

                element.scrollIntoView({
                  behavior: "smooth",
                  block: "center"
                });

                // OPTIONAL FLASH EFFECT
                element.classList.add("faq-highlight");

                setTimeout(() => {
                  element.classList.remove("faq-highlight");
                }, 2000);
              }
            }}
          />

          <Link
            to="/post-query"
            className="ask-question-btn"
          >
            + Ask Question
          </Link>

        </div>

      </div>

      {/* RESOLVE QUESTION BAR */}
      <div className="resolve-card">

        <div>
          <h2>Resolve a Question</h2>

          <p>
            Help fellow students by answering unresolved community questions.
          </p>
        </div>

        <Link
          to="/question"
          className="resolve-btn"
        >
          Resolve Questions
        </Link>

      </div>

      {/* FAQ GRID */}
      {!noResults ? (

        <div className="faq-grid">

          {filteredFaqs.map((catItem) => (

            <CategoryCard
              key={catItem.id}
              category={catItem}
            />

          ))}

        </div>

      ) : (

        <div className="ask-card">

          <h2>
            No matching FAQ found
          </h2>

          <p>
            Couldn't find your question?
          </p>

          <Link
            to="/post-query"
            className="ask-btn"
          >
            Ask a New Question
          </Link>

        </div>
      )}

      {/* RESOLVED QUESTIONS */}
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

                        <span className="verified-badge">
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