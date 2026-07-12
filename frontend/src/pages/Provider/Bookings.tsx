import { useEffect, useState } from "react";

import ProviderSidebar from "../../components/provider/ProviderSidebar";
import ProviderTopbar from "../../components/provider/ProviderTopbar";

import bookingService from "../../services/bookingService";
import type { Booking } from "../../services/bookingService";

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await bookingService.getProviderBookings();
      setBookings(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  const confirmBooking = async (id: string) => {
    try {
      await bookingService.confirmBooking(id);
      alert("Booking confirmed.");
      loadBookings();
    } catch (error) {
      console.error(error);
      alert("Unable to confirm booking.");
    }
  };

  const cancelBooking = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    try {
      await bookingService.providerCancelBooking(id);
      alert("Booking cancelled.");
      loadBookings();
    } catch (error) {
      console.error(error);
      alert("Unable to cancel booking.");
    }
  };

  const completeBooking = async (id: string) => {
    try {
      await bookingService.completeBooking(id);
      alert("Booking completed.");
      loadBookings();
    } catch (error) {
      console.error(error);
      alert("Unable to complete booking.");
    }
  };

  const statusColor = (status: string) => {
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
      <ProviderSidebar />

      <ProviderTopbar />

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
          Provider Bookings
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Manage all customer bookings.
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
            <h2>No bookings found.</h2>

            <p style={{ color: "#666" }}>
              Customer bookings will appear here.
            </p>
          </div>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking.id}
              style={{
                background: "#fff",
                borderRadius: "18px",
                padding: "24px",
                marginBottom: "25px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 10px 25px rgba(0,0,0,.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
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
                    borderRadius: "15px",
                    objectFit: "cover",
                  }}
                />

                <div>
                  <h2
                    style={{
                      color: "#A31D1D",
                      marginBottom: "10px",
                    }}
                  >
                    {booking.service.title}
                  </h2>

                  <p>
                    <strong>Customer:</strong>{" "}
                    {booking.customer.firstName}{" "}
                    {booking.customer.lastName}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {booking.bookingDate}
                  </p>

                  <p>
                    <strong>Time:</strong>{" "}
                    {booking.bookingTime}
                  </p>

                  {booking.notes && (
                    <p>
                      <strong>Notes:</strong>{" "}
                      {booking.notes}
                    </p>
                  )}
                </div>
              </div>

              <div
                style={{
                  textAlign: "right",
                }}
              >
                <span
                  style={{
                    background: statusColor(
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

                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {booking.status === "PENDING" && (
                    <>
                      <button
                        onClick={() =>
                          confirmBooking(booking.id)
                        }
                        style={greenButton}
                      >
                        Confirm
                      </button>

                      <button
                        onClick={() =>
                          cancelBooking(booking.id)
                        }
                        style={redButton}
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {booking.status === "CONFIRMED" && (
                    <>
                      <button
                        onClick={() =>
                          completeBooking(booking.id)
                        }
                        style={blueButton}
                      >
                        Complete
                      </button>

                      <button
                        onClick={() =>
                          cancelBooking(booking.id)
                        }
                        style={redButton}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </main>
    </>
  );
}

const greenButton: React.CSSProperties = {
  background: "#2E7D32",
  color: "#fff",
  border: "none",
  padding: "12px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: 600,
};

const redButton: React.CSSProperties = {
  background: "#C62828",
  color: "#fff",
  border: "none",
  padding: "12px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: 600,
};

const blueButton: React.CSSProperties = {
  background: "#1565C0",
  color: "#fff",
  border: "none",
  padding: "12px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: 600,
};