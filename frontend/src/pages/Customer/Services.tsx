import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import CustomerSidebar from "../../components/customer/CustomerSidebar";
import CustomerTopbar from "../../components/customer/CustomerTopbar";
import ServiceCard from "../../components/customer/ServiceCard";

import serviceService from "../../services/serviceService";
import type { Service } from "../../services/serviceService";

export default function Services() {
  const navigate = useNavigate();

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [sort, setSort] = useState("");

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await serviceService.getAllServices();
      setServices(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(services.map((s) => s.category))
      ),
    ];
  }, [services]);

  const locations = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(services.map((s) => s.location))
      ),
    ];
  }, [services]);

  const filteredServices = useMemo(() => {
    let data = [...services];

    if (search.trim() !== "") {
      data = data.filter((service) =>
        service.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      data = data.filter(
        (service) => service.category === category
      );
    }

    if (location !== "All") {
      data = data.filter(
        (service) => service.location === location
      );
    }

    if (sort === "low") {
      data.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      data.sort((a, b) => b.price - a.price);
    }

    if (sort === "new") {
      data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );
    }

    return data;
  }, [services, search, category, location, sort]);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "22px",
        }}
      >
        Loading services...
      </div>
    );
  }

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
        {/* Header */}

        <div
          style={{
            marginBottom: "30px",
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
            }}
          >
            Find trusted professionals near you.
          </p>
        </div>

        {/* Search & Filters */}

        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "18px",
            display: "grid",
            gridTemplateColumns:
              "2fr 1fr 1fr 1fr",
            gap: "18px",
            marginBottom: "35px",
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
            style={inputStyle}
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            style={inputStyle}
          >
            {categories.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

          <select
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            style={inputStyle}
          >
            {locations.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            style={inputStyle}
          >
            <option value="">
              Sort By
            </option>

            <option value="new">
              Newest
            </option>

            <option value="low">
              Price: Low → High
            </option>

            <option value="high">
              Price: High → Low
            </option>
          </select>
        </div>

        {/* Total */}

        <p
          style={{
            marginBottom: "20px",
            color: "#666",
            fontWeight: 600,
          }}
        >
          {filteredServices.length} Services Found
        </p>

        {/* Cards */}

        {filteredServices.length === 0 ? (
          <div
            style={{
              background: "#fff",
              padding: "60px",
              borderRadius: "18px",
              textAlign: "center",
              boxShadow:
                "0 10px 25px rgba(0,0,0,.08)",
            }}
          >
            <h2>No Services Found</h2>

            <p
              style={{
                color: "#777",
              }}
            >
              Try changing your search or
              filters.
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
            {filteredServices.map(
              (service) => (
                <ServiceCard
                  key={service.id}
                  image={service.imageUrl}
                  title={service.title}
                  category={service.category}
                  price={Number(service.price)}
                  onView={() =>
                    navigate(
                      `/customer/service/${service.id}`
                    )
                  }
                />
              )
            )}
          </div>
        )}
      </main>
    </>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "14px 18px",
  borderRadius: "12px",
  border: "1px solid #ECDCBE",
  outline: "none",
  background: "#FFFDF7",
  fontSize: "15px",
};
