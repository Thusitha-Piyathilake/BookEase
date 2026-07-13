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

  // Search & filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

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

  // Extract unique categories for the filter dropdown
  const categories = [
    "All",
    ...new Set(services.map((s) => s.category).filter(Boolean)),
  ];

  // Apply search and filter
  const filteredServices = services.filter((service) => {
    const matchesSearch = service.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || service.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

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

        {/* Search and Filter Bar */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "24px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="Search services by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              minWidth: "200px",
              padding: "10px 16px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "14px",
              background: "#fff",
            }}
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "14px",
              background: "#fff",
              minWidth: "150px",
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <h3>Loading services...</h3>
        ) : filteredServices.length === 0 ? (
          <div
            style={{
              background: "#fff",
              padding: "40px",
              borderRadius: "16px",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,.08)",
            }}
          >
            <h2>
              {services.length === 0
                ? "No services found"
                : "No matching services"}
            </h2>
            <p
              style={{
                color: "#666",
                marginTop: "10px",
              }}
            >
              {services.length === 0
                ? 'Click "Add Service" to create your first service.'
                : "Try adjusting your search or filter criteria."}
            </p>
          </div>
        ) : (
          filteredServices.map((service) => (
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