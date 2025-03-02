import { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");

  // Predefined links for specific search terms
  const RESOURCE_MAPPING = {
    depression: "https://www.mhanational.org/depression",
    Depression: "https://www.mhanational.org/depression",
    anxiety: "https://adaa.org/",
    Anxiety: "https://adaa.org/",
    addiction: "https://www.samhsa.gov/find-help/national-helpline",
    "suicidal thoughts": "https://988lifeline.org/",
    stress: "https://www.apa.org/topics/stress",
    "bipolar disorder": "https://www.nimh.nih.gov/health/topics/bipolar-disorder",
  };

  const handleSearch = () => {
    if (!query.trim()) return;

    const lowerCaseQuery = query.toLowerCase();

    // Check if any keyword is in the query
    for (const keyword in RESOURCE_MAPPING) {
      if (lowerCaseQuery.includes(keyword)) {
        window.location.href = RESOURCE_MAPPING[keyword]; // Redirect to the matched URL
        return;
      }
    }

    alert("No matching resources found. Try searching for depression, anxiety, addiction, etc.");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search mental health resources..."
        style={{ padding: "10px", width: "50%", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <button
        onClick={handleSearch}
        style={{ padding: "10px", marginLeft: "10px", borderRadius: "5px", cursor: "pointer" }}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
