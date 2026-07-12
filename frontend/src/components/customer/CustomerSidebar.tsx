import { NavLink } from "react-router-dom";

import "./customer.css";

export default function CustomerSidebar() {
  return (
    <aside className="provider-sidebar">
      <h1 className="logo">BookEase</h1>

      <nav>
        <NavLink
          to="/customer/dashboard"
          className="nav-link"
        >
          🏠 Dashboard
        </NavLink>

        <NavLink
          to="/customer/services"
          className="nav-link"
        >
          🔍 Browse Services
        </NavLink>

        <NavLink
          to="/customer/my-bookings"
          className="nav-link"
        >
          📅 My Bookings
        </NavLink>

        <NavLink
          to="/customer/reviews"
          className="nav-link"
        >
          ⭐ Reviews
        </NavLink>

        <NavLink
          to="/customer/profile"
          className="nav-link"
        >
          👤 Profile
        </NavLink>
      </nav>

      <button className="logout-btn">
        🚪 Logout
      </button>
    </aside>
  );
}