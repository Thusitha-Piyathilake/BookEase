import "./provider.css";

export default function ProviderTopbar() {
  return (
    <header className="provider-topbar">

      <div>
        <h1>Welcome, Provider 👋</h1>
        <p>Manage your services and bookings.</p>
      </div>

      <div className="topbar-right">

        <input
          type="text"
          placeholder="Search..."
          className="search-box"
        />

        <button className="notification-btn">
          🔔
        </button>

        <div className="provider-avatar">
          P
        </div>

      </div>

    </header>
  );
}