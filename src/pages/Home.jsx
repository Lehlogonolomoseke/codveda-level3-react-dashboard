import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";

function Home() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(saved);
  }, []);

  const handleSearch = (username) => {
    const updatedHistory = [
      username,
      ...history.filter((u) => u !== username),
    ].slice(0, 5);

    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    setHistory(updatedHistory);

    navigate(`/user/${username}`);
  };

  const handleClearHistory = () => {
    localStorage.removeItem("searchHistory");
    setHistory([]);
  };

  return (
    <div className="container">
      <div className="card" style={{ textAlign: "center" }}>
        <h1>Search GitHub User</h1>

        <div style={{ marginTop: "20px" }}>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {history.length > 0 && (
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <h3 style={{ margin: 0 }}>Recent Searches</h3>

            <button onClick={handleClearHistory} className="secondary-link">
              Clear History
            </button>
          </div>

          <div className="history-list">
            {history.map((item, index) => (
              <button
                key={index}
                className="history-btn"
                onClick={() => navigate(`/user/${item}`)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
