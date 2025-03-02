import { useState, useEffect, useRef } from "react";
import { Search as SearchIcon } from "lucide-react";
import "../Search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const inputRef = useRef(null);

  // Predefined links for specific search terms
  const RESOURCE_MAPPING = {
    depression: "https://www.mhanational.org/depression", 
    anxiety: "https://adaa.org/", 
    addiction: "https://www.samhsa.gov/find-help/national-helpline",
    suicide: "https://988lifeline.org/", 
    stress: "https://www.apa.org/topics/stress", 
    "bipolar disorder": "https://www.nimh.nih.gov/health/topics/bipolar-disorder", 
    ptsd: "https://www.ptsd.va.gov/", 
    loneliness: "https://www.campaigntoendloneliness.org/", 
    trauma: "https://www.helpguide.org/articles/ptsd-trauma/coping-with-emotional-and-psychological-trauma.htm",
    schizophrenia: "https://www.nami.org/learn-more/mental-health-conditions/schizophrenia",
    "obsessive compulsive disorder": "https://iocdf.org/",
    "eating disorders": "https://www.nationaleatingdisorders.org/",
    "borderline personality disorder": "https://www.nimh.nih.gov/health/topics/borderline-personality-disorder",
    "panic disorder": "https://adaa.org/understanding-anxiety/panic-disorder-agoraphobia",
    "social anxiety disorder": "https://www.anxiety.org/social-anxiety-disorder",
    "generalized anxiety disorder": "https://adaa.org/understanding-anxiety/generalized-anxiety-disorder-gad",
    "postpartum depression": "https://www.postpartum.net/",
    "sleep disorders": "https://www.sleepfoundation.org/sleep-disorders",
    "adhd": "https://chadd.org/",
    "autism spectrum disorder": "https://www.autismspeaks.org/",
    "dissociative identity disorder": "https://www.psychologytoday.com/us/conditions/dissociative-identity-disorder",
    "psychosis": "https://www.nami.org/About-Mental-Illness/Common-with-Mental-Illness/Psychosis",
    "seasonal affective disorder": "https://www.sad.org.uk/",
    "grief": "https://www.grief.com/",
    "drug-induced psychosis": "https://www.psychologytoday.com/us/conditions/drug-induced-psychosis",
    "stress-related disorders": "https://www.mayoclinic.org/diseases-conditions/stress/symptoms-causes/syc-20350494"
  };

  const suggestions = Object.keys(RESOURCE_MAPPING);

  // Filter suggestions based on input
  useEffect(() => {
    if (query.trim() === "") {
      // When no query, show all suggestions (but will be limited to 3 in the render)
      setFilteredSuggestions(suggestions);
    } else {
      // Filter any suggestion that contains the query characters (not just starts with)
      const filtered = suggestions.filter(suggestion => 
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }
  }, [query]);

  const handleSearch = () => {
    if (!query.trim()) return;

    const lowerCaseQuery = query.toLowerCase();

    for (const keyword in RESOURCE_MAPPING) {
      if (lowerCaseQuery.includes(keyword.toLowerCase())) {
        setLoading(true);
        setTimeout(() => {
          window.location.href = RESOURCE_MAPPING[keyword];
        }, 3000);
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

  const handleAutocomplete = (suggestion) => {
    setQuery(suggestion);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    
    // Trigger search with a small delay to show the selected suggestion in input
    setTimeout(() => {
      setLoading(true);
      setTimeout(() => {
        window.location.href = RESOURCE_MAPPING[suggestion];
      }, 3000);
    }, 100);
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest('.search-input') && !e.target.closest('.suggestions-dropdown') && 
        !e.target.closest('.autocomplete-dropdown')) {
      setShowSuggestions(false);
    }
  };

  // Add event listener for clicking outside
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="search-component">
      <div className="search-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          placeholder="Type a keyword..."
          className="search-input"
          autoComplete="off"
        />
        <button onClick={handleSearch} className="search-button">
          <SearchIcon size={20} color="black" />
        </button>
      </div>

      {query && showSuggestions && !loading && filteredSuggestions.length > 0 && (
        <div className="autocomplete-dropdown">
          {/* Show only the first 3 filtered suggestions */}
          {filteredSuggestions.slice(0).map((suggestion) => (
            <div
              key={suggestion}
              className="autocomplete-item"
              onClick={() => handleAutocomplete(suggestion)}
            >
              {highlightMatch(suggestion, query)}
            </div>
          ))}
        </div>
      )}

      {showSuggestions && !query && !loading && (
        <div className="suggestions-dropdown">
          <h4 className="suggestions-title">Try searching for:</h4>
          <div className="suggestions-grid">
            {/* Show only the first 3 initial suggestions */}
            {suggestions.slice(0, 3).map((suggestion) => (
              <div
                key={suggestion}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <p className="loading-text">
          Hint: if it won't load, try clicking the magnifying glass!
        </p>
      )}
    </div>
  );
};

// Helper function to highlight the matching part of the suggestion
const highlightMatch = (text, query) => {
  if (!query) return text;
  
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return text;
  
  return (
    <>
      {text.substring(0, index)}
      <span className="highlight">{text.substring(index, index + query.length)}</span>
      {text.substring(index + query.length)}
    </>
  );
};

export default Search;