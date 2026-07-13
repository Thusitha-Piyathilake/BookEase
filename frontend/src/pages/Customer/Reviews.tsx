import { useEffect, useState } from "react";

import CustomerSidebar from "../../components/customer/CustomerSidebar";
import CustomerTopbar from "../../components/customer/CustomerTopbar";

import reviewService from "../../services/reviewService";
import type { Review } from "../../services/reviewService";

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const data = await reviewService.getMyReviews();
      setReviews(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load reviews.");
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
          padding: "35px",
          background: "#F8F2DE",
          minHeight: "calc(100vh - 90px)",
        }}
      >
        <h1
          style={{
            color: "#A31D1D",
            marginBottom: "30px",
          }}
        >
          My Reviews
        </h1>

        {loading ? (
          <div
            style={{
              background: "#fff",
              padding: "40px",
              borderRadius: "16px",
              textAlign: "center",
            }}
          >
            Loading...
          </div>
        ) : reviews.length === 0 ? (
          <div
            style={{
              background: "#fff",
              padding: "50px",
              borderRadius: "18px",
              textAlign: "center",
              boxShadow: "0 10px 25px rgba(0,0,0,.08)",
            }}
          >
            <h2>No Reviews Yet</h2>

            <p
              style={{
                color: "#777",
                marginTop: "10px",
              }}
            >
              You haven't submitted any reviews yet.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "20px",
            }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                style={{
                  background: "#fff",
                  borderRadius: "18px",
                  padding: "25px",
                  boxShadow: "0 10px 25px rgba(0,0,0,.08)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        color: "#A31D1D",
                        margin: 0,
                      }}
                    >
                      {review.service.title}
                    </h2>

                    <p
                      style={{
                        color: "#666",
                        marginTop: "5px",
                      }}
                    >
                      Provider: 
                      {review.provider.name}
                    </p>
                  </div>

                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "#D84040",
                    }}
                  >
                    ⭐ {review.rating}/5
                  </div>
                </div>

                <p
                  style={{
                    color: "#444",
                    lineHeight: 1.7,
                    marginBottom: "20px",
                  }}
                >
                  {review.comment}
                </p>

                <small
                  style={{
                    color: "#888",
                  }}
                >
                  {new Date(review.createdAt).toLocaleDateString()}
                </small>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}