import CustomerSidebar from "../../components/customer/CustomerSidebar";
import CustomerTopbar from "../../components/customer/CustomerTopbar";
import StatsCard from "../../components/customer/StatsCard";

export default function CustomerDashboard() {
  return (
    <>
      <CustomerSidebar />

      <CustomerTopbar />

      <main
        style={{
          marginLeft: "260px",
          marginTop: "90px",
          padding: "35px",
          background: "#F8F2DE",
          minHeight: "calc(100vh - 90px)",
        }}
      >
        {/* Welcome Banner */}

        <div
          style={{
            background:
              "linear-gradient(135deg,#A31D1D 0%, #D84040 100%)",
            borderRadius: "20px",
            padding: "35px",
            color: "#fff",
            marginBottom: "35px",
            boxShadow: "0 12px 30px rgba(0,0,0,.12)",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "38px",
            }}
          >
            Welcome Back 👋
          </h1>

          <p
            style={{
              marginTop: "10px",
              fontSize: "17px",
              opacity: 0.9,
            }}
          >
            Discover trusted professionals and manage all your bookings in one
            place.
          </p>
        </div>

        {/* Statistics */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "25px",
            marginBottom: "40px",
          }}
        >
          <StatsCard
            title="Total Bookings"
            value={12}
            icon="📅"
          />

          <StatsCard
            title="Upcoming"
            value={4}
            icon="⏰"
          />

          <StatsCard
            title="Completed"
            value={8}
            icon="✅"
          />

          <StatsCard
            title="Available Services"
            value={26}
            icon="🛠️"
          />
        </div>

        {/* Quick Actions */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "25px",
            marginBottom: "40px",
          }}
        >
          <div
            style={cardStyle}
          >
            <h2>🔍 Browse Services</h2>

            <p>
              Find trusted professionals near you and book services easily.
            </p>

            <button
              style={buttonStyle}
              onClick={() => {
                window.location.href = "/customer/services";
              }}
            >
              Browse Now
            </button>
          </div>

          <div
            style={cardStyle}
          >
            <h2>📅 My Bookings</h2>

            <p>
              Track your upcoming and completed bookings.
            </p>

            <button
              style={buttonStyle}
              onClick={() => {
                window.location.href = "/customer/my-bookings";
              }}
            >
              View Bookings
            </button>
          </div>

          <div
            style={cardStyle}
          >
            <h2>⭐ Reviews</h2>

            <p>
              View and manage the reviews you've given to providers.
            </p>

            <button
              style={buttonStyle}
            >
              View Reviews
            </button>
          </div>
        </div>

        {/* Featured Section */}

        <div
          style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 10px 25px rgba(0,0,0,.08)",
          }}
        >
          <h2
            style={{
              color: "#A31D1D",
              marginBottom: "15px",
            }}
          >
            Featured Services
          </h2>

          <p
            style={{
              color: "#666",
            }}
          >
            Browse our most popular categories including House Cleaning,
            Plumbing, Electrical Repairs, Painting, Gardening, Appliance Repair,
            and many more.
          </p>

          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
              marginTop: "25px",
            }}
          >
            <span style={badgeStyle}>🧹 Cleaning</span>
            <span style={badgeStyle}>🔧 Plumbing</span>
            <span style={badgeStyle}>⚡ Electrical</span>
            <span style={badgeStyle}>🎨 Painting</span>
            <span style={badgeStyle}>🌿 Gardening</span>
            <span style={badgeStyle}>❄️ AC Repair</span>
          </div>
        </div>
      </main>
    </>
  );
}

const cardStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: "18px",
  padding: "28px",
  boxShadow: "0 10px 25px rgba(0,0,0,.08)",
};

const buttonStyle: React.CSSProperties = {
  marginTop: "20px",
  background: "#D84040",
  color: "#fff",
  border: "none",
  padding: "14px 22px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "15px",
};

const badgeStyle: React.CSSProperties = {
  background: "#FFF5F5",
  color: "#A31D1D",
  padding: "10px 18px",
  borderRadius: "30px",
  fontWeight: 600,
};