import { useEffect, useMemo, useState } from "react";

import CustomerSidebar from "../../components/customer/CustomerSidebar";
import CustomerTopbar from "../../components/customer/CustomerTopbar";
import StatsCard from "../../components/customer/StatsCard";
import BookingCalendar from "../../components/customer/BookingCalendar"; // ← added

import bookingService from "../../services/bookingService";
import type { Booking } from "../../services/bookingService";

import serviceService from "../../services/serviceService";
import type { Service } from "../../services/serviceService";

export default function CustomerDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // New states for modal
  const [selectedBookings, setSelectedBookings] = useState<Booking[]>([]);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [bookingData, serviceData] = await Promise.all([
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
    (booking) => booking.status === "PENDING" || booking.status === "CONFIRMED"
  ).length;

  const completedBookings = bookings.filter(
    (booking) => booking.status === "COMPLETED"
  ).length;

  const totalServices = services.length;

  // Memoized list of booked dates
  const bookedDates = useMemo(() => {
    return bookings.map((booking) => booking.bookingDate);
  }, [bookings]);

  // Handle date click: show bookings for that day
  const handleDateClick = (date: Date) => {
    const formatted = date.toISOString().split("T")[0];

    const bookingsForDay = bookings.filter(
      (booking) => booking.bookingDate === formatted
    );

    if (bookingsForDay.length > 0) {
      setSelectedBookings(bookingsForDay);
      setShowBookingModal(true);
    }
  };

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
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
              gap: "25px",
              marginBottom: "40px",
            }}
          >
            <StatsCard title="Total Bookings" value={totalBookings} icon="📅" />
            <StatsCard title="Upcoming" value={upcomingBookings} icon="⏰" />
            <StatsCard title="Completed" value={completedBookings} icon="✅" />
            <StatsCard
              title="Available Services"
              value={totalServices}
              icon="🛠️"
            />
          </div>
        )}

        {/* Booking Calendar (added) */}
        <BookingCalendar bookedDates={bookedDates} onDateClick={handleDateClick} />

        {/* Featured Section */}
        <div
          style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 10px 25px rgba(0,0,0,.08)",
            marginTop: "30px",
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

        {/* Booking Details Modal */}
        {showBookingModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,.45)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <div
              style={{
                width: "600px",
                maxWidth: "95%",
                background: "#fff",
                borderRadius: "20px",
                padding: "30px",
                boxShadow: "0 20px 40px rgba(0,0,0,.2)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "25px",
                }}
              >
                <h2
                  style={{
                    color: "#A31D1D",
                    margin: 0,
                  }}
                >
                  📅 Booking Details
                </h2>

                <button
                  onClick={() => setShowBookingModal(false)}
                  style={{
                    border: "none",
                    background: "#D84040",
                    color: "#fff",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  ✕
                </button>
              </div>

              {selectedBookings.map((booking) => (
                <div
                  key={booking.id}
                  style={{
                    border: "1px solid #eee",
                    borderRadius: "15px",
                    padding: "20px",
                    marginBottom: "18px",
                    background: "#FAFAFA",
                  }}
                >
                  <h3
                    style={{
                      color: "#A31D1D",
                      marginBottom: "12px",
                    }}
                  >
                    {booking.service.title}
                  </h3>

                  <p>
                    <strong>🕒 Time:</strong> {booking.bookingTime}
                  </p>

                  <p>
                    <strong>📅 Date:</strong> {booking.bookingDate}
                  </p>

                  <p>
                    <strong>📌 Status:</strong>{" "}
                    <span
                      style={{
                        color:
                          booking.status === "CONFIRMED"
                            ? "green"
                            : booking.status === "PENDING"
                            ? "#D97706"
                            : booking.status === "COMPLETED"
                            ? "#2563EB"
                            : "red",
                        fontWeight: 700,
                      }}
                    >
                      {booking.status}
                    </span>
                  </p>

                  <p>
                    <strong>💬 Notes:</strong>{" "}
                    {booking.notes || "No notes provided"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}

const badgeStyle: React.CSSProperties = {
  background: "#FFF5F5",
  color: "#A31D1D",
  padding: "10px 18px",
  borderRadius: "30px",
  fontWeight: 600,
};