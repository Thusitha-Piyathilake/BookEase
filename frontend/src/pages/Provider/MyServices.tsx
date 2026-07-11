import ProviderSidebar from "../../components/provider/ProviderSidebar";
import ProviderTopbar from "../../components/provider/ProviderTopbar";
import ServiceCard from "../../components/provider/ServiceCard";

export default function MyServices() {
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
          >
            + Add Service
          </button>
        </div>

        <ServiceCard
          image="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600"
          title="House Cleaning"
          category="Cleaning"
          price={5000}
        />

        <ServiceCard
          image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600"
          title="Plumbing"
          category="Home Repair"
          price={3500}
        />

        <ServiceCard
          image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600"
          title="Painting"
          category="Painting"
          price={7000}
        />
      </main>
    </>
  );
}