import { useEffect, useMemo, useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";

import adminService from "../../services/adminService";
import type { AdminUser } from "../../services/adminService";

export default function Users() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const data = await adminService.getUsers();

      setUsers(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;

    try {
      await adminService.deleteUser(id);

      alert("User deleted successfully.");

      loadUsers();
    } catch (error) {
      console.error(error);
      alert("Unable to delete user.");
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.email
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesRole =
        roleFilter === "" ||
        user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

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
          minHeight: "calc(100vh - 90px)",
        }}
      >
        <h1
          style={{
            color: "#A31D1D",
            marginBottom: "10px",
          }}
        >
          Manage Users
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          View and manage all registered users.
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
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #ddd",
              outline: "none",
            }}
          />

          <select
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(e.target.value)
            }
            style={{
              width: "220px",
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #ddd",
            }}
          >
            <option value="">All Roles</option>
            <option value="CUSTOMER">
              Customer
            </option>
            <option value="PROVIDER">
              Provider
            </option>
            <option value="ADMIN">
              Admin
            </option>
          </select>
        </div>

        {loading ? (
          <h2>Loading users...</h2>
        ) : filteredUsers.length === 0 ? (
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
            <h2>No users found.</h2>
          </div>
        ) : (

            filteredUsers.map((user) => (
  <div
    key={user.id}
    style={{
      background: "#fff",
      borderRadius: "20px",
      padding: "24px",
      marginBottom: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 10px 25px rgba(0,0,0,.08)",
    }}
  >
    <div>
      <h2
        style={{
          margin: 0,
          color: "#A31D1D",
        }}
      >
        {user.name}
      </h2>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Phone:</strong>{" "}
        {user.phone || "N/A"}
      </p>

      <p>
        <strong>Address:</strong>{" "}
        {user.address || "N/A"}
      </p>

      <p>
        <strong>Joined:</strong>{" "}
        {new Date(
          user.createdAt
        ).toLocaleDateString()}
      </p>
    </div>

    <div
      style={{
        textAlign: "right",
      }}
    >
      <span
        style={{
          background:
            user.role === "ADMIN"
              ? "#8E24AA"
              : user.role === "PROVIDER"
              ? "#1565C0"
              : "#2E7D32",
          color: "#fff",
          padding: "8px 18px",
          borderRadius: "30px",
          fontWeight: 600,
          display: "inline-block",
          marginBottom: "20px",
        }}
      >
        {user.role}
      </span>

      <br />

      <button
        onClick={() => deleteUser(user.id)}
        style={{
          background: "#D32F2F",
          color: "#fff",
          border: "none",
          padding: "12px 22px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        🗑 Delete User
      </button>
    </div>
  </div>
))

        )}
      </main>
    </>
  );
}