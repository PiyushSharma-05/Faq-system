import { useState } from "react";

function SearchBar({
  search,
  setSearch,
  suggestions = [],
  onSelectFaq
}) {

  const [focused, setFocused] = useState(false);

  const showSuggestions =
    focused &&
    search.trim() !== "" &&
    suggestions.length > 0;

  return (

    <div className="search-wrapper">

      <div className="search-box">

        <span className="search-icon">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search FAQs..."
          value={search}

          onChange={(e) =>
            setSearch(e.target.value)
          }

          onFocus={() =>
            setFocused(true)
          }

          onBlur={() => {
            setTimeout(() => {
              setFocused(false);
            }, 150);
          }}
        />

      </div>

      {showSuggestions && (

        <div className="search-dropdown">

          {suggestions
            .slice(0, 8)
            .map((faq) => (

              <div
                key={faq.id}
                className="dropdown-item"

                onMouseDown={() => {

                  setSearch(faq.question);

                  onSelectFaq(faq.id);

                  setFocused(false);
                }}
              >

                <div className="dropdown-question">
                  {faq.question}
                </div>

                <div className="dropdown-category">
                  {faq.categoryTitle}
                </div>

              </div>

            ))}

        </div>

      )}

    </div>
  );
}

export default SearchBar;