import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getUser, getRepos } from "../services/githubService";
import { motion } from "framer-motion";

function UserDetails() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (!isMounted) return;
        setLoading(true);
        setError("");

        const userData = await getUser(username);
        const repoData = await getRepos(username);

        if (!isMounted) return;
        setUser(userData);
        setRepos(repoData);
      } catch (err) {
        if (!isMounted) return;
        setError(err.message || "Something went wrong");
      } finally {
        if (!isMounted) return;
        setLoading(false);
      } 
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [username]);

  const topRepos = useMemo(() => {
    return [...repos]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 12);
  }, [repos]);

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

  if (!user) {
    return (
      <div className="container">
        <Link to="/" className="back-button">
          ← Back to Search
        </Link>

        <div className="card">
          <p className="muted" style={{ margin: 0 }}>
            No user data available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Link to="/" className="back-button">
        ← Back to Search
      </Link>

      <motion.div
        className="card"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <h2>{user.name || user.login}</h2>

        <img
          src={user.avatar_url}
          alt="avatar"
          width="120"
          className="avatar"
          loading="lazy"
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
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="primary-link"
            >
              View GitHub Profile
            </a>
          </div>
        )}
      </motion.div>

      <div className="card">
        <h3>Top Repositories (by Stars)</h3>

        <div className="repo-grid">
          {topRepos.map((repo) => (
            <motion.div
              key={repo.id}
              className="repo-card"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
            >
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
            </motion.div>
          ))}
        </div>

        {repos.length > 12 && (
          <p className="muted" style={{ marginTop: "12px" }}>
            Showing top 12 repos. Total public repos: {repos.length}.
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default UserDetails;
