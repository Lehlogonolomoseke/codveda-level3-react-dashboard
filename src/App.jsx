import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";
import RepoDetails from "./pages/RepoDetails";
import Navbar from "./components/Navbar";
import "./styles/app.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:username" element={<UserDetails />} />
        <Route path="/repo/:username/:repo" element={<RepoDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
