import { useEffect, useState } from "react";

import ProviderSidebar from "../../components/provider/ProviderSidebar";
import ProviderTopbar from "../../components/provider/ProviderTopbar";

import bookingService from "../../services/bookingService";
import type { Booking } from "../../services/bookingService";

// ----- Button styles -----
const greenButton: React.CSSProperties = {
  background: "#2E7D32",
  color: "#fff",
  border: "none",
  padding: "12px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "15px",
};

const redButton: React.CSSProperties = {
  background: "#C62828",
  color: "#fff",
  border: "none",
  padding: "12px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "15px",
};

const blueButton: React.CSSProperties = {
  background: "#1565C0",
  color: "#fff",
  border: "none",
  padding: "12px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "15px",
};

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    loadBookings();
  }, [page, search, status]);

  const loadBookings = async () => {
    try {
      setLoading(true);

      const data = await bookingService.getProviderBookings({
        page,
        limit,
        search,
        status,
      });

      setBookings(data);
    } catch (error: any) {
      console.error(error);

      // Better error message
      if (error?.response?.status === 403) {
        alert(
          "You are not authorized to view provider bookings.\n" +
          "Please log in as a Provider account."
        );
      } else {
        alert("Failed to load bookings.");
      }
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
      case "COMPLETED":
        return "#2E7D32";
      case "CONFIRMED":
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

        {/* Search & Filter */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "30px",
          }}
        >
          <input
            type="text"
            placeholder="Search customer or service..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #ddd",
            }}
          />

          <select
            value={status}
            onChange={(e) => {
              setPage(1);
              setStatus(e.target.value);
            }}
            style={{
              width: "220px",
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #ddd",
            }}
          >
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

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
          <>
            {bookings.map((booking) => (
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
                      <strong>Email:</strong>{" "}
                      {booking.customer.email}
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
                      background: statusColor(booking.status),
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
                          onClick={() => confirmBooking(booking.id)}
                          style={greenButton}
                        >
                          ✅ Confirm
                        </button>
                        <button
                          onClick={() => cancelBooking(booking.id)}
                          style={redButton}
                        >
                          ❌ Cancel
                        </button>
                      </>
                    )}

                    {booking.status === "CONFIRMED" && (
                      <>
                        <button
                          onClick={() => completeBooking(booking.id)}
                          style={blueButton}
                        >
                          ✔ Complete
                        </button>
                        <button
                          onClick={() => cancelBooking(booking.id)}
                          style={redButton}
                        >
                          ❌ Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                marginTop: "35px",
              }}
            >
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                style={{
                  padding: "12px 22px",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  background: "#A31D1D",
                  color: "#fff",
                }}
              >
                Previous
              </button>

              <span
                style={{
                  alignSelf: "center",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                Page {page}
              </span>

              <button
                disabled={bookings.length < limit}
                onClick={() => setPage(page + 1)}
                style={{
                  padding: "12px 22px",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  background: "#A31D1D",
                  color: "#fff",
                }}
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
}