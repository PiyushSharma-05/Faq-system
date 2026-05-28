import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import SearchBar
from "../components/faq/SearchBar";

import CategoryCard
from "../components/faq/CategoryCard";

import {
  faqData
} from "../data/mockFaqs";

function QueryPage() {

  const [search, setSearch] =
    useState("");

  const [
    resolvedQuestions,
    setResolvedQuestions
  ] = useState([]);

  /* FETCH RESOLVED QUESTIONS */

  useEffect(() => {

    fetch(
      "http://localhost:5000/questions"
    )

      .then((res) => res.json())

      .then((data) => {

        const resolved =
          data.filter(
            (q) =>
              q.status === "resolved"
          );

        setResolvedQuestions(
          resolved
        );

      })

      .catch((err) => {

        console.log(err);

      });

  }, []);

  /* UPVOTE FUNCTION */

  const upvoteQuestion = async (
  questionId
) => {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  if(!user){

    alert("Please login");

    return;
  }

  try {

    const response =
      await fetch(

        `http://localhost:5000/questions/${questionId}/upvote`,

        {
          method:"PUT",

          headers:{
            "Content-Type":
            "application/json"
          },

          body: JSON.stringify({

            username:
            user.username

          })
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
  /* ADD COMMUNITY FAQS INTO MAIN FAQ */

  const communityFaqs =
    resolvedQuestions.filter(
      (q) => q.addedToFaq
    );

  communityFaqs.forEach((question) => {

    const category =
      faqData.find(
        (cat) =>
          cat.category ===
          question.category
      );

    if (category) {

      const alreadyExists =
        category.faqs.find(
          (faq) =>
            faq.question ===
            question.question
        );

      if (!alreadyExists) {

        category.faqs.push({

          question:
            question.question,

          answer:
            question.answers.find(
              (a) => a.verified
            )?.text || ""

        });
      }
    }
  });

  /* FILTER FAQS */

  const filteredFaqs =
    faqData.map((category) => ({

      ...category,

      faqs:
        category.faqs.filter(
          (faq) =>

            faq.question
              .toLowerCase()

              .includes(
                search.toLowerCase()
              )
        )

    }));

  const noResults =
    filteredFaqs.every(
      (category) =>
        category.faqs.length === 0
    );

  return (

    <div className="faq-page">

      {/* HERO SECTION */}

      <div className="hero">

        <h1>
          Frequently Asked Questions
        </h1>

        <p>
          Find answers to commonly
          asked questions
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

      {/* RESOLVE CARD */}

      <div className="resolve-card">

        <div>

          <h2>
            Resolve a Question
          </h2>

          <p>
            Help fellow students
            by answering unresolved
            community questions.
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

          <h2>
            No matching FAQ found
          </h2>

          <p>
            Can't find what
            you're looking for?
          </p>

          <Link
            to="/post-query"
            className="ask-btn"
          >

            Ask a New Question

          </Link>

        </div>

      )}

      {/* RESOLVED COMMUNITY QUESTIONS */}

      {resolvedQuestions.length > 0 && (

        <div className="resolved-section">

          <h2>
            Resolved Community Questions
          </h2>

          {resolvedQuestions.map(
            (question) => (

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

                {/* VERIFIED ANSWERS */}

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

                {/* UPVOTE BUTTON */}

                <button
                  className="upvote-btn"
                  onClick={() =>
                    upvoteQuestion(
                      question.id
                    )
                  }
                >

                  👍 Upvote (
                  {question.upvotes || 0}
                  )

                </button>

                {/* FAQ BADGE */}

                {question.addedToFaq && (

                  <div
                    className="faq-badge"
                  >

                    ⭐ Added to Official FAQ

                  </div>

                )}

              </div>

            )
          )}

        </div>

      )}

    </div>

  );
}

export default QueryPage;