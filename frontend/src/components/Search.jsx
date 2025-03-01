import { useState } from "react";
import AxiosInstance from "../components/AxiosInstance"; 

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    console.log("Search button clicked or Enter key pressed"); // Debugging
    if (!query.trim()) {
      console.log("No query entered"); // Debugging
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      console.log("Sending request to backend with query:", query); // Debugging
      const response = await AxiosInstance.post("/mental-health-resources/get_resources/", {
        mental_health_issue: query
      });

      console.log("Response received:", response.data); // Debugging
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching resources:", error);
      setError("Failed to fetch resources. Please try again.");
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    console.log(`Key pressed: ${e.key}`); // Debugging
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

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul style={{ listStyleType: "none", padding: 0, marginTop: "20px" }}>
        {results.chatgpt_suggestion && <p><strong>AI Suggestion:</strong> {results.chatgpt_suggestion}</p>}
        {results.database_resources?.length > 0 ? (
          results.database_resources.map((resource, index) => (
            <li key={index} style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
              <strong>{resource.name}</strong> - {resource.description}
            </li>
          ))
        ) : (
          !loading && <p>No results found.</p>
        )}
      </ul>
    </div>
  );
};

export default Search;
