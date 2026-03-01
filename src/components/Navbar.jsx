import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "20px",
            letterSpacing: "1px",
          }}
        >
          GitHub Dashboard
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
