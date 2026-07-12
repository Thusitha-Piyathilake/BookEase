import { useEffect, useMemo, useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";

import adminService from "../../services/adminService";
import type { AdminServiceItem } from "../../services/adminService";

export default function Services() {
  const [services, setServices] = useState<
    AdminServiceItem[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("");

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);

      const data =
        await adminService.getServices();

      setServices(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (
    id: string
  ) => {
    const confirmed = window.confirm(
      "Delete this service?"
    );

    if (!confirmed) return;

    try {
      await adminService.deleteService(id);

      alert("Service deleted.");

      loadServices();
    } catch (error) {
      console.error(error);
      alert("Unable to delete service.");
    }
  };

  const filteredServices =
    useMemo(() => {
      return services.filter((service) => {
        const matchesSearch =
          service.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          service.provider.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesCategory =
          categoryFilter === "" ||
          service.category ===
            categoryFilter;

        return (
          matchesSearch &&
          matchesCategory
        );
      });
    }, [
      services,
      search,
      categoryFilter,
    ]);

  const categories = [
    ...new Set(
      services.map(
        (service) =>
          service.category
      )
    ),
  ];

  return (
    <>
      <AdminSidebar />

      <AdminTopbar />

      <main
        style={{
          marginLeft: "260px",
          marginTop: "90px",
          padding: "35px",
          background: "#F8F2DE",
          minHeight:
            "calc(100vh - 90px)",
        }}
      >
        <h1
          style={{
            color: "#A31D1D",
            marginBottom: "10px",
          }}
        >
          Manage Services
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          View and manage all
          services.
        </p>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <input
            type="text"
            placeholder="Search service or provider..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "12px",
              border:
                "1px solid #ddd",
              outline: "none",
            }}
          />

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(
                e.target.value
              )
            }
            style={{
              width: "220px",
              padding: "14px",
              borderRadius: "12px",
              border:
                "1px solid #ddd",
            }}
          >
            <option value="">
              All Categories
            </option>

            {categories.map(
              (category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              )
            )}
          </select>
        </div>

        {loading ? (
          <h2>
            Loading services...
          </h2>
        ) : filteredServices.length ===
          0 ? (
          <div
            style={{
              background: "#fff",
              padding: "50px",
              borderRadius: "18px",
              textAlign: "center",
              boxShadow:
                "0 10px 30px rgba(0,0,0,.08)",
            }}
          >
            <h2>
              No services found.
            </h2>
          </div>
        ) : (

            filteredServices.map((service) => (
  <div
    key={service.id}
    style={{
      background: "#fff",
      borderRadius: "20px",
      padding: "22px",
      marginBottom: "25px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow:
        "0 10px 25px rgba(0,0,0,.08)",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <img
        src={
          service.imageUrl ||
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600"
        }
        alt={service.title}
        style={{
          width: "120px",
          height: "120px",
          objectFit: "cover",
          borderRadius: "15px",
        }}
      />

      <div>
        <h2
          style={{
            margin: 0,
            color: "#A31D1D",
          }}
        >
          {service.title}
        </h2>

        <p>
          <strong>Category:</strong>{" "}
          {service.category}
        </p>

        <p>
          <strong>Provider:</strong>{" "}
          {service.provider.name}
        </p>

        <p>
          <strong>Location:</strong>{" "}
          {service.location}
        </p>

        <p>
          <strong>Duration:</strong>{" "}
          {service.duration} mins
        </p>

        <h3
          style={{
            color: "#D84040",
            marginTop: "8px",
          }}
        >
          Rs.{" "}
          {Number(service.price).toFixed(2)}
        </h3>
      </div>
    </div>

    <div
      style={{
        textAlign: "right",
      }}
    >
      <button
        onClick={() =>
          deleteService(service.id)
        }
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
        🗑 Delete Service
      </button>
    </div>
  </div>
))
        )}
      </main>
    </>
  );
}