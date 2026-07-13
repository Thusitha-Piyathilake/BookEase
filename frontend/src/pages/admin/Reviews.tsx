import { useEffect, useMemo, useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";

import adminService from "../../services/adminService";
import type { AdminReview } from "../../services/adminService";

export default function Reviews() {
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      setLoading(true);

      const data = await adminService.getReviews();

      setReviews(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (id: string) => {
    const confirmed = window.confirm("Delete this review?");

    if (!confirmed) return;

    try {
      await adminService.deleteReview(id);

      alert("Review deleted.");

      loadReviews();
    } catch (error) {
      console.error(error);
      alert("Unable to delete review.");
    }
  };

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      return (
        review.customer.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        review.provider.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        review.service.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        review.comment
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [reviews, search]);

  return (
    <>
      <AdminSidebar />

      <AdminTopbar />

      <main
        style={{
          marginLeft: "260px",
          marginTop: "30px",          // reduced from 90px
          padding: "20px 35px 35px",  // trimmed top padding
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
          Manage Reviews
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          View and manage customer reviews.
        </p>

        <input
          type="text"
          placeholder="Search customer, provider, service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #ddd",
            marginBottom: "30px",
          }}
        />

        {loading ? (
          <h2>Loading reviews...</h2>
        ) : filteredReviews.length === 0 ? (
          <div
            style={{
              background: "#fff",
              padding: "50px",
              borderRadius: "18px",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,.08)",
            }}
          >
            <h2>No reviews found.</h2>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "24px",
                marginBottom: "20px",
                boxShadow: "0 10px 25px rgba(0,0,0,.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <h2
                    style={{
                      margin: 0,
                      color: "#A31D1D",
                    }}
                  >
                    ⭐ {review.rating}/5
                  </h2>

                  <p>
                    <strong>Service:</strong> {review.service.title}
                  </p>

                  <p>
                    <strong>Customer:</strong> {review.customer.name}
                  </p>

                  <p>
                    <strong>Provider:</strong> {review.provider.name}
                  </p>

                  <p>
                    <strong>Comment:</strong>
                  </p>

                  <p
                    style={{
                      color: "#666",
                      marginTop: "-5px",
                    }}
                  >
                    {review.comment}
                  </p>

                  <p
                    style={{
                      fontSize: "14px",
                      color: "#888",
                    }}
                  >
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => deleteReview(review.id)}
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
                  🗑 Delete Review
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    </>
  );
}