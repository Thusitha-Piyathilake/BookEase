import "./provider.css";
import { Link, useLocation } from "react-router-dom";

export default function ProviderSidebar() {
  const location = useLocation();

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

      <button className="logout-btn">
        🚪 Logout
      </button>

    </aside>
  );
}