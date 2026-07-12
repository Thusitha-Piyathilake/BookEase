import { useEffect, useState } from "react";

import CustomerSidebar from "../../components/customer/CustomerSidebar";
import CustomerTopbar from "../../components/customer/CustomerTopbar";
import StatsCard from "../../components/customer/StatsCard";

import bookingService from "../../services/bookingService";
import type { Booking } from "../../services/bookingService";

import serviceService from "../../services/serviceService";
import type { Service } from "../../services/serviceService";

export default function CustomerDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [bookingData, serviceData] =
        await Promise.all([
          bookingService.getMyBookings(),
          serviceService.getAllServices(),
        ]);

      setBookings(bookingData);
      setServices(serviceData);
    } catch (error) {
      console.error("Failed to load dashboard", error);
    } finally {
      setLoading(false);
    }
  };

  const totalBookings = bookings.length;

  const upcomingBookings = bookings.filter(
    (booking) =>
      booking.status === "PENDING" ||
      booking.status === "CONFIRMED"
  ).length;

  const completedBookings = bookings.filter(
    (booking) =>
      booking.status === "COMPLETED"
  ).length;

  const totalServices = services.length;

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
        

        {/* Statistics */}

        {loading ? (
          <h2>Loading dashboard...</h2>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(250px,1fr))",
              gap: "25px",
              marginBottom: "40px",
            }}
          >
            <StatsCard
              title="Total Bookings"
              value={totalBookings}
              icon="📅"
            />

            <StatsCard
              title="Upcoming"
              value={upcomingBookings}
              icon="⏰"
            />

            <StatsCard
              title="Completed"
              value={completedBookings}
              icon="✅"
            />

            <StatsCard
              title="Available Services"
              value={totalServices}
              icon="🛠️"
            />
          </div>
        )}

        

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
            Plumbing, Electrical Repairs, Painting, Gardening,
            Appliance Repair, and many more.
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