import { useEffect, useState } from "react";

import ProviderSidebar from "../../components/provider/ProviderSidebar";
import ProviderTopbar from "../../components/provider/ProviderTopbar";
import StatsCard from "../../components/provider/StatsCard";
import RecentBookings from "../../components/provider/RecentBookings";

import serviceService from "../../services/serviceService";
import bookingService from "../../services/bookingService";
import reviewService from "../../services/reviewService";

import type { Service } from "../../services/serviceService";
import type { Booking } from "../../services/bookingService";

export default function ProviderDashboard() {
  const [loading, setLoading] = useState(true);

  const [services, setServices] = useState<Service[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [
        servicesData,
        bookingsData,
        ratingData,
      ] = await Promise.all([
        serviceService.getMyServices(),
        bookingService.getProviderBookings(),
        reviewService.getMyAverageRating(),
      ]);

      setServices(servicesData);
      setBookings(bookingsData);
      setAverageRating(ratingData.averageRating);
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "PENDING"
  ).length;

  const completedBookings = bookings.filter(
    (booking) => booking.status === "COMPLETED"
  ).length;

  const recentBookings = [...bookings]
    .sort(
      (a, b) =>
        new Date(b.bookingDate).getTime() -
        new Date(a.bookingDate).getTime()
    )
    .slice(0, 5);

  if (loading) {
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
          <h2>Loading dashboard...</h2>
        </main>
      </>
    );
  }

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
        {/* Welcome */}

        

        {/* Statistics */}

        <div
          className="stats-grid"
          style={{
            marginBottom: "35px",
          }}
        >
          <StatsCard
            title="Total Services"
            value={services.length}
            icon="🛠️"
          />

          <StatsCard
            title="Pending Bookings"
            value={pendingBookings}
            icon="📅"
          />

          <StatsCard
            title="Completed Jobs"
            value={completedBookings}
            icon="✅"
          />

          <StatsCard
            title="Average Rating"
            value={averageRating}
            icon="⭐"
          />
        </div>

        

        {/* Recent Bookings */}

        <RecentBookings bookings={recentBookings} />
      </main>
    </>
  );
}