const BASE_URL = "https://api.github.com/users";

export const getUser = async (username) => {
  const response = await fetch(`${BASE_URL}/${username}`);
  if (!response.ok) throw new Error("User not found");
  return await response.json();
};

export const getRepos = async (username) => {
  const response = await fetch(`${BASE_URL}/${username}/repos`);
  if (!response.ok) throw new Error("Repositories not found");
  return await response.json();
};

export const getRepoDetails = async (username, repo) => {
  const response = await fetch(
    `https://api.github.com/repos/${username}/${repo}`,
  );
  if (!response.ok) throw new Error("Repository not found");
  return await response.json();
};
