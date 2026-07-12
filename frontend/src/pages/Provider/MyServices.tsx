import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProviderSidebar from "../../components/provider/ProviderSidebar";
import ProviderTopbar from "../../components/provider/ProviderTopbar";
import ServiceCard from "../../components/provider/ServiceCard";

import serviceService from "../../services/serviceService";
import type { Service } from "../../services/serviceService";

export default function MyServices() {
  const navigate = useNavigate();

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const loadServices = async () => {
    try {
      const data = await serviceService.getMyServices();
      setServices(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmed) return;

    try {
      await serviceService.deleteService(id);

      setServices((prev) =>
        prev.filter((service) => service.id !== id)
      );

      alert("Service deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete service.");
    }
  };

  return (
    <>
      <ProviderSidebar />

      <ProviderTopbar />

      <main
        style={{
          marginLeft: "260px",
          padding: "40px",
          background: "#F8F2DE",
          minHeight: "calc(100vh - 90px)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <div>
            <h1
              style={{
                color: "#A31D1D",
                marginBottom: "8px",
              }}
            >
              My Services
            </h1>

            <p
              style={{
                color: "#666",
              }}
            >
              Manage all the services you offer.
            </p>
          </div>

          <button
            style={{
              background: "#D84040",
              color: "#fff",
              border: "none",
              padding: "14px 24px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "15px",
            }}
            onClick={() => navigate("/provider/add-service")}
          >
            + Add Service
          </button>
        </div>

        {loading ? (
          <h3>Loading services...</h3>
        ) : services.length === 0 ? (
          <div
            style={{
              background: "#fff",
              padding: "40px",
              borderRadius: "16px",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,.08)",
            }}
          >
            <h2>No services found</h2>

            <p
              style={{
                color: "#666",
                marginTop: "10px",
              }}
            >
              Click "Add Service" to create your first service.
            </p>
          </div>
        ) : (
          services.map((service) => (
            <ServiceCard
              key={service.id}
              image={
                service.imageUrl ||
                "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600"
              }
              title={service.title}
              category={service.category}
              price={service.price}
              onEdit={() =>
                navigate(`/provider/edit-service/${service.id}`)
              }
              onDelete={() => handleDelete(service.id)}
            />
          ))
        )}
      </main>
    </>
  );
}