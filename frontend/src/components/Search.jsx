import { useState } from "react";
import AxiosInstance from "../components/AxiosInstance";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const response = await AxiosInstance.post("/mental-health-resources/get_resources/", { mental_health_issue: query });
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Search for Mental Health Resources</h2>
      <input
        type="text"
        placeholder="Enter keywords (e.g., anxiety, stress relief)..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>

      {results.length > 0 && (
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              <a href={result.url} target="_blank" rel="noopener noreferrer">
                {result.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
