import "./customer.css";

export default function CustomerTopbar() {
  return (
    <header
      style={{
        position: "fixed",
        left: "260px",
        top: 0,
        right: 0,
        height: "90px",
        background: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 40px",
        borderBottom: "1px solid #E8D8A8",
        zIndex: 100,
      }}
    >
      <div>
        <h1
          style={{
            color: "#A31D1D",
            margin: 0,
            fontSize: "42px",
            fontWeight: 700,
          }}
        >
          Welcome 👋
        </h1>

        <p
          style={{
            margin: "6px 0 0",
            color: "#666",
            fontSize: "18px",
          }}
        >
          Find trusted professionals near you.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
        }}
      >
        <input
          type="text"
          placeholder="Search services..."
          style={{
            width: "300px",
            padding: "13px 18px",
            borderRadius: "12px",
            border: "1px solid #E8D8A8",
            background: "#FFF7DD",
            fontSize: "15px",
            outline: "none",
          }}
        />

        <button
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            border: "none",
            background: "#FFF7DD",
            cursor: "pointer",
            fontSize: "22px",
          }}
        >
          🔔
        </button>

        <div
          style={{
            width: "54px",
            height: "54px",
            borderRadius: "50%",
            background: "#D84040",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: 700,
            fontSize: "22px",
          }}
        >
          C
        </div>
      </div>
    </header>
  );
}