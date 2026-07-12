import "./customer.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function CustomerSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    {
      name: "Dashboard",
      path: "/customer/dashboard",
      icon: "🏠",
    },
    {
      name: "Browse Services",
      path: "/customer/services",
      icon: "🔍",
    },
    {
      name: "My Bookings",
      path: "/customer/my-bookings",
      icon: "📅",
    },
    {
      name: "Reviews",
      path: "/customer/reviews",
      icon: "⭐",
    },
    {
      name: "Profile",
      path: "/customer/profile",
      icon: "👤",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
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