import { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Predefined links for specific search terms
  const RESOURCE_MAPPING = {
    depression: "https://www.mhanational.org/depression", 
    Depression: "https://www.mhanational.org/depression", 
    anxiety: "https://adaa.org/", 
    Anxiety: "https://adaa.org/", 
    addiction: "https://www.samhsa.gov/find-help/national-helpline", "suicidal thoughts": "https://988lifeline.org/", 
    Addiction: "https://www.samhsa.gov/find-help/national-helpline", "suicidal thoughts": "https://988lifeline.org/", 
    stress: "https://www.apa.org/topics/stress", 
    bipolar_disorder: "https://www.nimh.nih.gov/health/topics/bipolar-disorder", 
    Stress: "https://www.apa.org/topics/stress", "bipolar disorder": "https://www.nimh.nih.gov/health/topics/bipolar-disorder", ptsd: "https://www.ptsd.va.gov/", Ptsd: "https://www.ptsd.va.gov/", PTSD: "https://www.ptsd.va.gov/", PtSD: "https://www.ptsd.va.gov/", loneliness: "https://www.campaigntoendloneliness.org/", Loneliness: "https://www.campaigntoendloneliness.org/", trauma: "https://www.helpguide.org/articles/ptsd-trauma/coping-with-emotional-and-psychological-trauma.htm", 
    Trauma: "https://www.helpguide.org/articles/ptsd-trauma/coping-with-emotional-and-psychological-trauma.htm",
  };

  const handleSearch = () => {
    if (!query.trim()) return;

    const lowerCaseQuery = query.toLowerCase();


    for (const keyword in RESOURCE_MAPPING) {
      if (lowerCaseQuery.includes(keyword)) {
        setLoading(true);
        setTimeout(() => {
          window.location.href = RESOURCE_MAPPING[keyword]
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

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask ChatGPT about mental health..."
        style={{ padding: "10px", width: "50%", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <button
        onClick={handleSearch}
        style={{ padding: "10px", marginLeft: "10px", borderRadius: "5px", cursor: "pointer" }}
      >
        Search
      </button>

      {loading && (
        <p style={{ marginTop: "20px", fontSize: "18px", fontStyle: "italic" }}>
          Our bot is analyzing your request
        </p>
      )}
    </div>
  );
};

export default Search;
