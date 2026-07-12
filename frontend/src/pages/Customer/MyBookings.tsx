import { useEffect, useState } from "react";

import CustomerSidebar from "../../components/customer/CustomerSidebar";
import CustomerTopbar from "../../components/customer/CustomerTopbar";

import bookingService from "../../services/bookingService";
import type { Booking } from "../../services/bookingService";

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await bookingService.getMyBookings();
      setBookings(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id: string) => {
    const confirmed = window.confirm(
      "Cancel this booking?"
    );

    if (!confirmed) return;

    try {
      await bookingService.cancelBooking(id);

      alert("Booking cancelled.");

      loadBookings();
    } catch (error) {
      console.error(error);
      alert("Unable to cancel booking.");
    }
  };

  const badgeColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "#2E7D32";

      case "COMPLETED":
        return "#1565C0";

      case "CANCELLED":
        return "#C62828";

      default:
        return "#F57C00";
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
        <h1
          style={{
            color: "#A31D1D",
            marginBottom: "10px",
          }}
        >
          My Bookings
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Manage all your bookings.
        </p>

        {loading ? (
          <h2>Loading...</h2>
        ) : bookings.length === 0 ? (
          <div
            style={{
              background: "#fff",
              padding: "50px",
              borderRadius: "18px",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,.08)",
            }}
          >
            <h2>No bookings yet.</h2>

            <p
              style={{
                color: "#666",
              }}
            >
              Book your first service to see it here.
            </p>
          </div>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking.id}
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "22px",
                marginBottom: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <img
                  src={
                    booking.service.imageUrl ||
                    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600"
                  }
                  alt={booking.service.title}
                  style={{
                    width: "110px",
                    height: "110px",
                    objectFit: "cover",
                    borderRadius: "15px",
                  }}
                />

                <div>
                  <h2
                    style={{
                      margin: 0,
                      color: "#A31D1D",
                    }}
                  >
                    {booking.service.title}
                  </h2>

                  <p>{booking.service.category}</p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {booking.bookingDate}
                  </p>

                  <p>
                    <strong>Time:</strong>{" "}
                    {booking.bookingTime}
                  </p>

                  <h3
                    style={{
                      color: "#D84040",
                    }}
                  >
                    Rs.{" "}
                    {Number(
                      booking.service.price
                    ).toFixed(2)}
                  </h3>
                </div>
              </div>

              <div
                style={{
                  textAlign: "right",
                }}
              >
                <span
                  style={{
                    background: badgeColor(
                      booking.status
                    ),
                    color: "#fff",
                    padding: "8px 18px",
                    borderRadius: "30px",
                    fontWeight: 600,
                  }}
                >
                  {booking.status}
                </span>

                {booking.status === "PENDING" && (
                  <>
                    <br />
                    <br />

                    <button
                      onClick={() =>
                        cancelBooking(booking.id)
                      }
                      style={{
                        background: "#D84040",
                        color: "#fff",
                        border: "none",
                        padding: "12px 22px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      Cancel Booking
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </main>
    </>
  );
}