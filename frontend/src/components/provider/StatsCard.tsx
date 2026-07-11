import "./provider.css";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
}

export default function StatsCard({
  title,
  value,
  icon,
}: StatsCardProps) {
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