import { useState } from "react";
import AxiosInstance from "../components/AxiosInstance"; 
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      // Fetch the token from localStorage or session storage
      const token = localStorage.getItem("authToken");  // or sessionStorage.getItem("authToken");
  
      // If no token is found, handle the unauthorized error
      if (!token) {
        console.error("No token found in localStorage.");
        setError("Authentication required. Please log in.");
        return;
      }
  
      // Send the POST request to your backend with token in the headers
      const response = await axios.post(
        'http://127.0.0.1:8000/mental-health-resources/', 
        { mental_health_issue: query }, 
        {
          headers: {
            'Authorization': `Token ${token}`  // Add token to the request header
          }
        }
      );
  
      // Check if response and response.data are valid before accessing them
      if (response && response.data) {
        console.log('Fetched resources:', response.data);
        setResults(response.data);  // Update the state with fetched resources
      } else {
        console.error('Response does not contain data');
        setError('No data found.');
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
  
      // Handle different error cases based on error type
      if (error.response) {
        // If the error is from the server (status 500 or other)
        console.error('Server error:', error.response);
        setError('Failed to fetch resources from the server. Please try again later.');
      } else if (error.request) {
        // If the request was made but no response was received
        console.error('No response received:', error.request);
        setError('No response from server. Please check your network connection.');
      } else {
        // If there was an issue setting up the request
        console.error('Error in setting up request:', error.message);
        setError('An error occurred while setting up the request. Please try again.');
      }
    }

    setLoading(true);
    setError(null);
    
    try {
      console.log("Sending request to backend with query:", query); // Debugging
      const response = await AxiosInstance.post("/mental-health-resources/get_resources/", {
        mental_health_issue: query
      });

      console.log("Response received:", response.data); // Debugging

      if (response && response.data) {
        setResults(response.data);
      } else {
        setResults(null); // If no data received, reset results
      }
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
        {results ? (
          <>
            {results.chatgpt_suggestion && (
              <p><strong>AI Suggestion:</strong> {results.chatgpt_suggestion}</p>
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
