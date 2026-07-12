import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CustomerSidebar from "../../components/customer/CustomerSidebar";
import CustomerTopbar from "../../components/customer/CustomerTopbar";

import reviewService from "../../services/reviewService";

export default function LeaveReview() {
  const navigate = useNavigate();
  const { bookingId } = useParams();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReview = async () => {
    if (!bookingId) return;

    if (!comment.trim()) {
      alert("Please enter your review.");
      return;
    }

    try {
      setLoading(true);

      await reviewService.createReview({
        bookingId,
        rating,
        comment,
      });

      alert("Review submitted successfully.");

      navigate("/customer/my-bookings");
    } catch (error) {
      console.error(error);
      alert("Unable to submit review.");
    } finally {
      setLoading(false);
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
          padding: "40px",
          background: "#F8F2DE",
          minHeight: "calc(100vh - 90px)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "700px",
            background: "#fff",
            borderRadius: "20px",
            padding: "35px",
            boxShadow: "0 10px 30px rgba(0,0,0,.08)",
          }}
        >
          <h1
            style={{
              color: "#A31D1D",
              marginBottom: "10px",
            }}
          >
            Leave a Review
          </h1>

          <p
            style={{
              color: "#666",
              marginBottom: "30px",
            }}
          >
            Share your experience with this service.
          </p>

          <label
            style={{
              fontWeight: 600,
            }}
          >
            Rating
          </label>

          <select
            value={rating}
            onChange={(e) =>
              setRating(Number(e.target.value))
            }
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "10px",
              marginBottom: "25px",
              borderRadius: "10px",
              border: "1px solid #ddd",
            }}
          >
            <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
            <option value={4}>⭐⭐⭐⭐ (4)</option>
            <option value={3}>⭐⭐⭐ (3)</option>
            <option value={2}>⭐⭐ (2)</option>
            <option value={1}>⭐ (1)</option>
          </select>

          <label
            style={{
              fontWeight: 600,
            }}
          >
            Comment
          </label>

          <textarea
            rows={6}
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            placeholder="Tell others about your experience..."
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              resize: "none",
              marginTop: "10px",
            }}
          />

          <button
            onClick={submitReview}
            disabled={loading}
            style={{
              marginTop: "30px",
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "12px",
              background: "#D84040",
              color: "#fff",
              fontWeight: 600,
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </main>
    </>
  );
}