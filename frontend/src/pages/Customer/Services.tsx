import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import serviceService from "../../services/serviceService";
import type { Service } from "../../services/serviceService";

import ServiceCard from "../../components/customer/ServiceCard.tsx";
export default function Services() {
  const navigate = useNavigate();

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await serviceService.getAllServices();
      setServices(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          padding: "50px",
          textAlign: "center",
        }}
      >
        <h2>Loading services...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#F8F2DE",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            color: "#A31D1D",
            marginBottom: "10px",
          }}
        >
          Browse Services
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "35px",
          }}
        >
          Find trusted professionals near you.
        </p>

        {services.length === 0 ? (
          <div
            style={{
              background: "#fff",
              padding: "50px",
              borderRadius: "16px",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,.08)",
            }}
          >
            <h2>No Services Available</h2>

            <p
              style={{
                color: "#777",
                marginTop: "10px",
              }}
            >
              Providers haven't added any services yet.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill,minmax(320px,1fr))",
              gap: "30px",
            }}
          >
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                image={service.imageUrl}
                title={service.title}
                category={service.category}
                price={Number(service.price)}
                onView={() =>
                  navigate(`/customer/service/${service.id}`)
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}