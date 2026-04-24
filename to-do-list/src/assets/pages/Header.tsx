import "./Header.css";
import { NavLink } from "react-router";
import { useNavigate } from "react-router";

export function Header() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="header">
      <div className="page-title">Task List</div>
      <div className="right-section">
        <NavLink to="/" className="js-home-page">
          Home
        </NavLink>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
}
