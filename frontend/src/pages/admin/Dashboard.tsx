import { useEffect, useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";

import adminService from "../../services/adminService";
import type { DashboardStats } from "../../services/adminService";

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await adminService.getDashboard();
      setStats(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <AdminSidebar />
        <AdminTopbar />

        <main
          style={{
            marginLeft: "260px",
            marginTop: "30px",        // reduced from 90px
            padding: "20px 35px 35px", // trimmed top padding
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
      <AdminSidebar />

      <AdminTopbar />

      <main
        style={{
          marginLeft: "260px",
          marginTop: "30px",        // reduced from 90px
          padding: "20px 35px 35px", // trimmed top padding
          background: "#F8F2DE",
          minHeight: "calc(100vh - 90px)",
        }}
      >
        <h1
          style={{
            color: "#A31D1D",
            marginBottom: "10px",
          }}
        >
          Admin Dashboard
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "35px",
          }}
        >
          Overview of the BookEase platform.
        </p>

        <div className="stats-grid">

          <StatCard
            icon="👥"
            title="Total Users"
            value={stats?.totalUsers ?? 0}
          />

          <StatCard
            icon="🙋"
            title="Customers"
            value={stats?.customers ?? 0}
          />

          <StatCard
            icon="🧑‍🔧"
            title="Providers"
            value={stats?.providers ?? 0}
          />

          <StatCard
            icon="👑"
            title="Admins"
            value={stats?.admins ?? 0}
          />

          <StatCard
            icon="🛠️"
            title="Services"
            value={stats?.totalServices ?? 0}
          />

          <StatCard
            icon="📅"
            title="Bookings"
            value={stats?.totalBookings ?? 0}
          />

          <StatCard
            icon="🟡"
            title="Pending"
            value={stats?.pendingBookings ?? 0}
          />

          <StatCard
            icon="🟢"
            title="Confirmed"
            value={stats?.confirmedBookings ?? 0}
          />

          <StatCard
            icon="✅"
            title="Completed"
            value={stats?.completedBookings ?? 0}
          />

          <StatCard
            icon="❌"
            title="Cancelled"
            value={stats?.cancelledBookings ?? 0}
          />

          <StatCard
            icon="⭐"
            title="Reviews"
            value={stats?.totalReviews ?? 0}
          />

        </div>
      </main>
    </>
  );
}

interface CardProps {
  icon: string;
  title: string;
  value: number;
}

function StatCard({
  icon,
  title,
  value,
}: CardProps) {
  return (
    <div className="stats-card">

      <div className="stats-icon">
        {icon}
      </div>

      <div className="stats-info">
        <h3>{value}</h3>
        <p>{title}</p>
      </div>

    </div>
  );
}