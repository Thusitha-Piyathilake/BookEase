import ProviderSidebar from "../../components/provider/ProviderSidebar";
import ProviderTopbar from "../../components/provider/ProviderTopbar";
import StatsCard from "../../components/provider/StatsCard";

export default function ProviderDashboard() {
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
  <div className="stats-grid">

    <StatsCard
      title="Total Services"
      value={12}
      icon="🛠️"
    />

    <StatsCard
      title="Bookings"
      value={48}
      icon="📅"
    />

    <StatsCard
      title="Completed Jobs"
      value={39}
      icon="✅"
    />

    <StatsCard
      title="Average Rating"
      value="4.9"
      icon="⭐"
    />

  </div>
</main>
    </>
  );
}