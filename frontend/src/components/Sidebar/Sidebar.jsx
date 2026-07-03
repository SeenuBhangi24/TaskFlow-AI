import { NavLink, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaProjectDiagram,
  FaTasks,
  FaRobot,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar() {

  const navigate = useNavigate();

  // Logout Function
  function handleLogout() {

    // Remove Token
    localStorage.removeItem("token");

    // Redirect to Login
    navigate("/");

  }

  return (

    <div className="sidebar">

      {/* Logo */}

      <h2 className="logo">
        TaskFlow AI
      </h2>

      {/* Navigation */}

      <nav>

        <NavLink
          to="/dashboard"
          className="nav-link"
        >
          <FaHome />

          <span>Dashboard</span>

        </NavLink>

        <NavLink
          to="/projects"
          className="nav-link"
        >
          <FaProjectDiagram />

          <span>Projects</span>

        </NavLink>

        <NavLink
          to="/tasks"
          className="nav-link"
        >
          <FaTasks />

          <span>Tasks</span>

        </NavLink>

        <NavLink
          to="/ai"
          className="nav-link"
        >
          <FaRobot />

          <span>AI Assistant</span>

        </NavLink>

      </nav>


      <NavLink
        to="/profile"
        className="nav-link"
      >
        <FaUser />

        <span>Profile</span>

      </NavLink>

      {/* Logout */}

      <button
        className="logout-btn"
        onClick={handleLogout}
      >

        <FaSignOutAlt />

        Logout

      </button>

    </div>

  );

}

export default Sidebar;