const BASE_URL = "https://api.github.com/users";
const REPO_URL = "https://api.github.com/repos";

export const getUser = async (username) => {
  const safeUsername = encodeURIComponent(username);

  const response = await fetch(`${BASE_URL}/${safeUsername}`);
  if (!response.ok) {
    if (response.status === 404) throw new Error("User not found");
    throw new Error("Failed to fetch user");
  }

  return await response.json();
};

export const getRepos = async (username) => {
  const safeUsername = encodeURIComponent(username);

  const response = await fetch(
    `${BASE_URL}/${safeUsername}/repos?per_page=100&sort=updated`,
  );
  if (!response.ok) {
    if (response.status === 404) throw new Error("Repositories not found");
    throw new Error("Failed to fetch repositories");
  }

  return await response.json();
};

export const getRepoDetails = async (username, repo) => {
  const safeUsername = encodeURIComponent(username);
  const safeRepo = encodeURIComponent(repo);

  const response = await fetch(`${REPO_URL}/${safeUsername}/${safeRepo}`);
  if (!response.ok) {
    if (response.status === 404) throw new Error("Repository not found");
    throw new Error("Failed to fetch repository details");
  }

  return await response.json();
};
