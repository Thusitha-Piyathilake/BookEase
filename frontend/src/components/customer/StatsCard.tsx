interface Props {
  title: string;
  value: number | string;
  icon: string;
  color?: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  color = "#D84040",
}: Props) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "28px",
        boxShadow: "0 10px 25px rgba(0,0,0,.08)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: ".3s",
      }}
    >
      <div>
        <p
          style={{
            color: "#777",
            fontSize: "15px",
            marginBottom: "10px",
          }}
        >
          {title}
        </p>

        <h2
          style={{
            margin: 0,
            color,
            fontSize: "34px",
            fontWeight: 700,
          }}
        >
          {value}
        </h2>
      </div>

      <div
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "18px",
          background: "#FFF5F5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "34px",
        }}
      >
        {icon}
      </div>
    </div>
  );
}