# GitHub Dashboard – Codveda Internship Level 3

This project was developed as part of my Frontend Development Internship at Codveda Technologies (Level 3).

The application is an advanced React dashboard that allows users to search GitHub profiles, view top repositories, and explore repository details using the GitHub REST API.

---

## Features

• Search for any GitHub username  
• Persistent search history (stored in localStorage)  
• Clear search history functionality  
• Dynamic routing with React Router  
• User profile details display  
• Top repositories sorted by stars  
• Repository details page  
• Loading states  
• Error handling for invalid users and repositories  
• Modern responsive UI

---

## 📸 Screenshots

### Home Page

![Home](./screenshots/home.png)

### User Details

![User](./screenshots/user_details.png)

### Repository Details

![Repository](./screenshots/repo_details.png)

### User Not Found

![User Not Found](./screenshots/user_not_found.png)

---

## Technologies Used

• React (Vite)  
• React Router  
• JavaScript (ES6+)  
• CSS3  
• GitHub REST API  
• LocalStorage

---

## Project Structure

```
codveda-level3-react-dashboard

src
│
├── components
│   |── Navbar.jsx
|   └── SearchBar.jsx
│
├── pages
│   ├── Home.jsx
│   ├── UserDetails.jsx
│   └── RepoDetails.jsx
│
├── services
│   └── githubService.js
│
├── styles
│   └── app.css
│
├── App.jsx
└── main.jsx
```

---

## How It Works

1. User enters a GitHub username.
2. The app fetches user data and repositories from the GitHub API.
3. Repositories are sorted by star count and limited to the top 12.
4. Clicking a repository opens a detailed view.
5. Search history is saved locally and persists across sessions.

---

## GitHub API Endpoints Used

• `GET https://api.github.com/users/{username}`  
• `GET https://api.github.com/users/{username}/repos`  
• `GET https://api.github.com/repos/{username}/{repo}`

---

## Installation & Running Locally

Clone the repository:

```
git clone https://github.com/Lehlogonolomoseke/codveda-level3-react-dashboard.git
```

Navigate into the project:

```
cd codveda-level3-react-dashboard
```

Install dependencies:

```
npm install
```

Run development server:

```
npm run dev
```

---

## Learning Outcomes

This project strengthened my understanding of:

• React component architecture  
• Dynamic routing with React Router  
• State management using useState and useEffect  
• Handling asynchronous API requests  
• Managing persistent UI state with localStorage  
• Sorting and transforming API data  
• Building a clean and structured frontend project

---

## Internship Information

Company: Codveda Technologies  
Program: Frontend Development Internship  
Level: Level 3

---

## Author

Lehlogonolo Moseke

BSc Information Technology (Computer Science & Informatics)

GitHub:  
https://github.com/Lehlogonolomoseke

LinkedIn:  
https://linkedin.com/in/lehlogonolo-moseke-474a8a280

---

## Status

Completed
