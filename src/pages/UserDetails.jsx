import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, getRepos } from "../services/githubService";

function UserDetails() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const userData = await getUser(username);
        const repoData = await getRepos(username);

        setUser(userData);
        setRepos(repoData);
      } catch (err) {
        setError(err.message);
      }

      setLoading(false);
    };

    fetchData();
  }, [username]);

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <p className="muted">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <Link to="/" className="back-button">
          ← Back to Search
        </Link>

        <div className="card">
          <p style={{ color: "red", margin: 0 }}>{error}</p>
        </div>
      </div>
    );
  }

  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 12);

  return (
    <div className="container">
      <Link to="/" className="back-button">
        ← Back to Search
      </Link>

      <div className="card">
        <h2>{user.name || user.login}</h2>

        <img
          src={user.avatar_url}
          alt="avatar"
          width="120"
          className="avatar"
        />

        {user.bio ? (
          <p className="muted">{user.bio}</p>
        ) : (
          <p className="muted">No bio available.</p>
        )}

        <p>Followers: {user.followers}</p>
        <p>Following: {user.following}</p>

        {user.html_url && (
          <div className="action-row">
            <a href={user.html_url} target="_blank" className="primary-link">
              View GitHub Profile
            </a>
          </div>
        )}
      </div>

      <div className="card">
        <h3>Top Repositories (by Stars)</h3>

        <div className="repo-grid">
          {topRepos.map((repo) => (
            <div key={repo.id} className="repo-card">
              <Link
                to={`/repo/${username}/${encodeURIComponent(repo.name)}`}
                className="repo-link"
              >
                {repo.name}
              </Link>

              <p className="muted" style={{ margin: "6px 0 0" }}>
                ⭐ {repo.stargazers_count}{" "}
                {repo.language ? `• ${repo.language}` : ""}
              </p>

              {repo.description && (
                <p className="muted" style={{ margin: "8px 0 0" }}>
                  {repo.description.length > 80
                    ? repo.description.slice(0, 80) + "..."
                    : repo.description}
                </p>
              )}
            </div>
          ))}
        </div>

        {repos.length > 12 && (
          <p className="muted" style={{ marginTop: "12px" }}>
            Showing top 12 repos. Total public repos: {repos.length}.
          </p>
        )}
      </div>
    </div>
  );
}

export default UserDetails;
