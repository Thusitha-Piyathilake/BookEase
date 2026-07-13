import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import serviceService from "../../services/serviceService";
import type { Service } from "../../services/serviceService";

export default function HomeServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await serviceService.getAllServices();
        setServices(data);
      } catch (error) {
        console.error("Failed to load services", error);
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  // 🔁 Book Now → redirect to login page
  const handleBookNow = () => {
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <main
        style={{
          minHeight: "calc(100vh - 200px)",
          background: "#F8F2DE",
          padding: "60px 20px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1
            style={{
              color: "#A31D1D",
              fontSize: "36px",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            Our Services
          </h1>
          <p
            style={{
              textAlign: "center",
              color: "#666",
              marginBottom: "40px",
              fontSize: "18px",
            }}
          >
            Find trusted professionals for every service you need.
          </p>

          {loading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <h2>Loading services...</h2>
            </div>
          ) : services.length === 0 ? (
            <div
              style={{
                background: "#fff",
                padding: "50px",
                borderRadius: "20px",
                textAlign: "center",
              }}
            >
              <h2>No services available at the moment.</h2>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "30px",
              }}
            >
              {services.map((service) => (
                <div
                  key={service.id}
                  style={{
                    background: "#fff",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 10px 25px rgba(0,0,0,.08)",
                    transition: "transform 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-5px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  <img
                    src={
                      service.imageUrl ||
                      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600"
                    }
                    alt={service.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <div style={{ padding: "20px" }}>
                    <h3
                      style={{
                        color: "#A31D1D",
                        marginBottom: "8px",
                        fontSize: "22px",
                      }}
                    >
                      {service.title}
                    </h3>
                    <p
                      style={{
                        color: "#777",
                        marginBottom: "12px",
                        fontSize: "14px",
                      }}
                    >
                      {service.category}
                    </p>
                    <p
                      style={{
                        color: "#444",
                        marginBottom: "12px",
                        fontSize: "14px",
                        lineHeight: 1.6,
                      }}
                    >
                      {service.description?.substring(0, 100)}
                      {service.description?.length > 100 ? "..." : ""}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "22px",
                          fontWeight: 700,
                          color: "#D84040",
                        }}
                      >
                        Rs. {Number(service.price).toFixed(2)}
                      </span>
                      <button
                        onClick={handleBookNow}   // ← now goes to login
                        style={{
                          background: "#D84040",
                          color: "#fff",
                          border: "none",
                          padding: "10px 20px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontWeight: 600,
                          transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#A31D1D")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "#D84040")
                        }
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}