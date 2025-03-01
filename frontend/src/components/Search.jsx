import { useState } from "react";
import AxiosInstance from "../components/AxiosInstance"; // Adjust path if needed

// Include FontAwesome CSS for icons
const fontAwesomeLink = (
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
  />
);

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

  // Inline styles for the search bar
  const searchBarStyle = {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 40px 10px 10px", // Extra padding on the right for the icon
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "border-color 0.3s ease",
  };

  const buttonStyle = {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "20px",
    color: "black", // Set the magnifying glass to black
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    color: "rgb(236, 201, 75)", // Hover color (yellow)
  };

  return (
    <>
      {fontAwesomeLink} {/* Load FontAwesome icons */}

      <div style={searchBarStyle}>
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type="text"
            placeholder="Enter keywords (e.g., anxiety, stress relief)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={inputStyle}
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            style={loading ? buttonHoverStyle : buttonStyle}
          >
            {loading ? (
              <i className="fas fa-spinner fa-spin"></i> // Loader icon
            ) : (
              <i className="fas fa-search"></i> // Magnifying glass icon in black
            )}
          </button>
        </div>
      </div>

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
    </>
  );
};

export default Search;
