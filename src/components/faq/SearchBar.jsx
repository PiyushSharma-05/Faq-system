function SearchBar({ search, setSearch }) {
  return (
    <div className="search-box">
      <span className="search-icon">🔍</span>

      <input
        type="text"
        placeholder="Search FAQs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;