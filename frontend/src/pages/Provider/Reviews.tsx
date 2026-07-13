import { useEffect, useState } from "react";

import ProviderSidebar from "../../components/provider/ProviderSidebar";
import ProviderTopbar from "../../components/provider/ProviderTopbar";

import reviewService from "../../services/reviewService";
import type { Review } from "../../services/reviewService";

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const data = await reviewService.getProviderReviews();
      setReviews(data);

      const stats = await reviewService.getMyAverageRating();
      setAverageRating(stats.averageRating);
      setTotalReviews(stats.totalReviews);
    } catch (error) {
      console.error(error);
      alert("Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ProviderSidebar />
      <ProviderTopbar />

      <main
        style={{
          marginLeft: "260px",
          marginTop: "30px", // reduced from 90px
          padding: "20px 35px 35px", // trimmed top padding
          background: "#F8F2DE",
          minHeight: "calc(100vh - 90px)",
        }}
      >
        <h1
          style={{
            color: "#A31D1D",
            marginBottom: 10,
          }}
        >
          Customer Reviews
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: 30,
          }}
        >
          See what customers say about your services.
        </p>

        <div
          style={{
            background: "#fff",
            padding: 25,
            borderRadius: 20,
            marginBottom: 30,
            boxShadow: "0 10px 25px rgba(0,0,0,.08)",
          }}
        >
          <h2
            style={{
              color: "#A31D1D",
              marginBottom: 10,
            }}
          >
            ⭐ {averageRating.toFixed(1)}
          </h2>
          <p
            style={{
              color: "#666",
            }}
          >
            {totalReviews} Reviews
          </p>
        </div>

        {loading ? (
          <h2>Loading...</h2>
        ) : reviews.length === 0 ? (
          <div
            style={{
              background: "#fff",
              padding: 50,
              borderRadius: 20,
              textAlign: "center",
            }}
          >
            <h2>No reviews yet.</h2>
            <p style={{ color: "#666" }}>
              Customer reviews will appear here.
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              style={{
                background: "#fff",
                borderRadius: 20,
                padding: 25,
                marginBottom: 25,
                display: "flex",
                gap: 20,
                boxShadow: "0 10px 25px rgba(0,0,0,.08)",
              }}
            >
              <img
                src={
                  review.service.imageUrl ||
                  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600"
                }
                alt={review.service.title}
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: 15,
                }}
              />
              <div
                style={{
                  flex: 1,
                }}
              >
                <h2
                  style={{
                    color: "#A31D1D",
                    marginBottom: 8,
                  }}
                >
                  {review.service.title}
                </h2>
                <h3
                  style={{
                    color: "#F39C12",
                    marginBottom: 12,
                  }}
                >
                  {"⭐".repeat(review.rating)}
                </h3>
                <p
                  style={{
                    marginBottom: 12,
                  }}
                >
                  {review.comment}
                </p>
                <p
                  style={{
                    color: "#666",
                  }}
                >
                  <strong>Customer:</strong>{" "}
                  {review.customer.name}
                </p>
                <p
                  style={{
                    color: "#888",
                    marginTop: 5,
                  }}
                >
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </main>
    </>
  );
}