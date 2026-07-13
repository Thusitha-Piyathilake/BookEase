import { useEffect, useMemo, useState } from "react";
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

  // NEW
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

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

  // Categories
  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(services.map((s) => s.category))
      ),
    ];
  }, [services]);

  // Filtered Services
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        service.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        service.category
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        service.location
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" ||
        service.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [services, search, categoryFilter]);

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
        {/* Header */}

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

            <p style={{ color: "#666" }}>
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
            onClick={() =>
              navigate("/provider/add-service")
            }
          >
            + Add Service
          </button>
        </div>

        {/* Search & Filter */}

        {!loading && services.length > 0 && (
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "16px",
              marginBottom: "25px",
              display: "flex",
              gap: "15px",
              alignItems: "center",
              flexWrap: "wrap",
              boxShadow:
                "0 10px 25px rgba(0,0,0,.08)",
            }}
          >
            <input
              type="text"
              placeholder="🔍 Search services..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              style={{
                flex: 1,
                minWidth: "280px",
                padding: "13px 16px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                fontSize: "15px",
                outline: "none",
              }}
            />

            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value)
              }
              style={{
                padding: "13px 16px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                fontSize: "15px",
                minWidth: "220px",
                cursor: "pointer",
              }}
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>

            <div
              style={{
                background: "#F8F2DE",
                color: "#A31D1D",
                padding: "12px 18px",
                borderRadius: "10px",
                fontWeight: 700,
              }}
            >
              {filteredServices.length} Service
              {filteredServices.length !== 1 && "s"}
            </div>
          </div>
        )}

        {/* Loading */}

        {loading ? (
          <h3>Loading services...</h3>
        ) : services.length === 0 ? (
          <div
            style={{
              background: "#fff",
              padding: "40px",
              borderRadius: "16px",
              textAlign: "center",
              boxShadow:
                "0 10px 30px rgba(0,0,0,.08)",
            }}
          >
            <h2>No services found</h2>

            <p
              style={{
                color: "#666",
                marginTop: "10px",
              }}
            >
              Click "Add Service" to create your
              first service.
            </p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div
            style={{
              background: "#fff",
              padding: "50px",
              borderRadius: "16px",
              textAlign: "center",
              boxShadow:
                "0 10px 30px rgba(0,0,0,.08)",
            }}
          >
            <h2>No matching services</h2>

            <p
              style={{
                color: "#666",
                marginTop: "10px",
              }}
            >
              Try another keyword or category.
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
                navigate(
                  `/provider/edit-service/${service.id}`
                )
              }
              onDelete={() =>
                handleDelete(service.id)
              }
            />
          ))
        )}
      </main>
    </>
  );
}