import "./provider.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function ProviderSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    {
      name: "Dashboard",
      path: "/provider/dashboard",
      icon: "🏠",
    },
    {
      name: "My Services",
      path: "/provider/services",
      icon: "🛠️",
    },
    {
      name: "Bookings",
      path: "/provider/bookings",
      icon: "📅",
    },
    {
      name: "Reviews",
      path: "/provider/reviews",
      icon: "⭐",
    },
    {
      name: "Profile",
      path: "/provider/profile",
      icon: "👤",
    },
  ];

  const handleLogout = () => {
    // Remove saved authentication
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Navigate to Home
    navigate("/");
  };

  return (
    <aside className="provider-sidebar">
      <div className="provider-logo">
        <h2>
          Book<span>Ease</span>
        </h2>
      </div>

      <nav className="provider-menu">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={
              location.pathname === item.path
                ? "provider-link active"
                : "provider-link"
            }
          >
            <span>{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        🚪 Logout
      </button>
    </aside>
  );
}