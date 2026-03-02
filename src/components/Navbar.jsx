import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link to="/" className="brand">
          GitHub Dashboard
        </Link>

        <div className="nav-links">
          <Link
            to="/"
            className={
              location.pathname === "/" ? "nav-link active" : "nav-link"
            }
          >
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
