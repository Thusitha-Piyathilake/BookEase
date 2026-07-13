import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import serviceService from "../../services/serviceService";
import bookingService from "../../services/bookingService";

import type { Service } from "../../services/serviceService";

export default function ServiceDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [service, setService] = useState<Service | null>(null);

  const [loading, setLoading] = useState(true);

  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [notes, setNotes] = useState("");

  const [booking, setBooking] = useState(false);

  useEffect(() => {
    if (id) {
      loadService();
    }
  }, [id]);

  const loadService = async () => {
    try {
      const data = await serviceService.getServiceById(id!);
      setService(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load service.");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!bookingDate || !bookingTime) {
      alert("Please select booking date and time.");
      return;
    }

    try {
      setBooking(true);

      await bookingService.createBooking({
        serviceId: id!,
        bookingDate,
        bookingTime,
        notes,
      });

      alert("Booking created successfully!");

      navigate("/customer/my-bookings");
    } catch (error) {
      console.error(error);
      alert("Failed to create booking.");
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          padding: "60px",
          textAlign: "center",
        }}
      >
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!service) {
    return (
      <div
        style={{
          padding: "60px",
          textAlign: "center",
        }}
      >
        <h2>Service not found.</h2>
      </div>
    );
  }

  // Compute tomorrow's date in YYYY-MM-DD format for the min attribute
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div
      style={{
        background: "#F8F2DE",
        minHeight: "100vh",
        padding: "50px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,.08)",
        }}
      >
        <img
          src={
            service.imageUrl ||
            "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800"
          }
          alt={service.title}
          style={{
            width: "100%",
            height: "420px",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            padding: "40px",
          }}
        >
          <h1
            style={{
              color: "#A31D1D",
              marginBottom: "10px",
            }}
          >
            {service.title}
          </h1>

          <p
            style={{
              color: "#777",
              fontSize: "18px",
            }}
          >
            {service.category}
          </p>

          <h2
            style={{
              color: "#D84040",
              marginTop: "20px",
            }}
          >
            Rs. {Number(service.price).toFixed(2)}
          </h2>

          <p
            style={{
              marginTop: "30px",
              lineHeight: 1.8,
            }}
          >
            {service.description}
          </p>

          <div
            style={{
              display: "flex",
              gap: "30px",
              marginTop: "25px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <strong>Duration</strong>

              <p>{service.duration} Minutes</p>
            </div>

            <div>
              <strong>Location</strong>

              <p>{service.location}</p>
            </div>
          </div>

          <hr
            style={{
              margin: "40px 0",
            }}
          />

          <h2
            style={{
              color: "#A31D1D",
              marginBottom: "25px",
            }}
          >
            Book This Service
          </h2>

          <div
            style={{
              display: "grid",
              gap: "18px",
            }}
          >
            <input
              type="date"
              value={bookingDate}
              onChange={(e) =>
                setBookingDate(e.target.value)
              }
              min={minDate}  // ← Only future dates allowed (from tomorrow onward)
              style={{
                padding: "15px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                fontSize: "16px",
              }}
            />

            <input
              type="time"
              value={bookingTime}
              onChange={(e) =>
                setBookingTime(e.target.value)
              }
              style={{
                padding: "15px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                fontSize: "16px",
              }}
            />

            <textarea
              rows={5}
              placeholder="Additional Notes (Optional)"
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              style={{
                padding: "15px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                resize: "none",
                fontSize: "16px",
              }}
            />

            <button
              onClick={handleBooking}
              disabled={booking}
              style={{
                background: "#D84040",
                color: "#fff",
                border: "none",
                padding: "18px",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "17px",
              }}
            >
              {booking ? "Booking..." : "Book Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}