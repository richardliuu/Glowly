import { useState } from "react";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch the token from localStorage or sessionStorage
      const token = localStorage.getItem("authToken"); // or sessionStorage.getItem("authToken");

      if (!token) {
        console.error("No token found in localStorage.");
        setError("Authentication required. Please log in.");
        setLoading(false);
        return;
      }

      console.log("🔍 Sending request to backend with query:", query);

      // Send request to the correct API endpoint
      const response = await axios.post(
        "http://127.0.0.1:8000/mental-health-resources/get-resources/",
        { mental_health_issue: query },
        {
          headers: {
            Authorization: `Token ${token}`, // Pass auth token
          },
        }
      );

      console.log("✅ Response received:", response.data);

      if (response && response.data) {
        setResults(response.data);
      } else {
        setResults(null);
        setError("No data found.");
      }
    } catch (error) {
      console.error("❌ Error fetching resources:", error);

      if (error.response) {
        console.error("🛑 Server error:", error.response);
        setError("Failed to fetch resources from the server. Please try again later.");
      } else if (error.request) {
        console.error("🌐 No response received:", error.request);
        setError("No response from server. Please check your network connection.");
      } else {
        console.error("⚙️ Error setting up request:", error.message);
        setError("An error occurred while setting up the request. Please try again.");
      }
    } finally {
      setLoading(false);
    }
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

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul style={{ listStyleType: "none", padding: 0, marginTop: "20px" }}>
        {results ? (
          <>
            {results.chatgpt_suggestion && (
              <p>
                <strong>AI Suggestion:</strong> {results.chatgpt_suggestion}
              </p>
            )}

            {results.database_resources && results.database_resources.length > 0 ? (
              results.database_resources.map((resource, index) => (
                <li key={index} style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  <strong>{resource.name}</strong> - {resource.description}
                </li>
              ))
            ) : (
              !loading && <p>No results found.</p>
            )}
          </>
        ) : (
          !loading && <p>No results found.</p>
        )}
      </ul>
    </div>
  );
};

export default Search;
