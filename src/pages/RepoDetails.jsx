import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRepoDetails } from "../services/githubService";

function RepoDetails() {
  const { username, repo } = useParams();
  const decodedRepo = decodeURIComponent(repo);

  const [repoData, setRepoData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getRepoDetails(username, decodedRepo);
        setRepoData(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchRepo();
  }, [username, decodedRepo]);

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <p className="muted">Loading repository details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <Link to={`/user/${username}`} className="back-button">
          ← Back to User
        </Link>

        <div className="card">
          <p style={{ color: "red", margin: 0 }}>{error}</p>
        </div>
      </div>
    );
  }

  const updatedAt = repoData.updated_at
    ? new Date(repoData.updated_at).toLocaleString()
    : "N/A";

  return (
    <div className="container">
      <Link to={`/user/${username}`} className="back-button">
        ← Back to User
      </Link>

      <div className="card">
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <span className="badge">
            {repoData.visibility?.toUpperCase() || "PUBLIC"}
          </span>
          {repoData.language && (
            <span className="badge">{repoData.language}</span>
          )}
          {repoData.license?.name && (
            <span className="badge">{repoData.license.name}</span>
          )}
        </div>

        <h2 style={{ marginTop: "14px" }}>{repoData.name}</h2>

        {repoData.description ? (
          <p className="muted">{repoData.description}</p>
        ) : (
          <p className="muted">No description provided.</p>
        )}

        <div className="detail-grid">
          <div className="repo-card">
            ⭐ Stars: <strong>{repoData.stargazers_count}</strong>
          </div>

          <div className="repo-card">
            Forks: <strong>{repoData.forks_count}</strong>
          </div>

          <div className="repo-card">
            Open Issues: <strong>{repoData.open_issues_count}</strong>
          </div>

          <div className="repo-card">
            Default Branch: <strong>{repoData.default_branch}</strong>
          </div>

          <div className="repo-card">
            ⏱ Last Updated: <strong>{updatedAt}</strong>
          </div>
        </div>

        <div className="action-row">
          <a href={repoData.html_url} target="_blank" className="primary-link">
            View on GitHub
          </a>

          {repoData.homepage ? (
            <a
              href={repoData.homepage}
              target="_blank"
              className="secondary-link"
            >
              Live Demo
            </a>
          ) : (
            <span
              className="secondary-link"
              style={{ opacity: 0.6, cursor: "not-allowed" }}
            >
              No Live Demo
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default RepoDetails;
