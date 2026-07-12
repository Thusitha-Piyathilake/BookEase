import "./admin.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: "📊",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "👥",
    },
    {
      name: "Services",
      path: "/admin/services",
      icon: "🛠️",
    },
    {
      name: "Reviews",
      path: "/admin/reviews",
      icon: "⭐",
    },
  ];

  const handleLogout = () => {
    // Remove saved authentication
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Go back to home page
    navigate("/");
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">
        <h2>
          Book<span>Ease</span>
        </h2>
      </div>

      <nav className="admin-menu">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={
              location.pathname === item.path
                ? "admin-link active"
                : "admin-link"
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