import "./ServiceCard.css";

interface Props {
  image?: string;
  title: string;
  category: string;
  price: number;
  onView: () => void;
}

export default function ServiceCard({
  image,
  title,
  category,
  price,
  onView,
}: Props) {
  return (
    <div className="customer-service-card">
      <img
        src={
          image ||
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600"
        }
        alt={title}
      />

      <div className="customer-service-content">
        <h2>{title}</h2>

        <p>{category}</p>

        <h3>Rs. {Number(price).toFixed(2)}</h3>

        <button
          className="view-btn"
          onClick={onView}
        >
          View Details
        </button>
      </div>
    </div>
  );
}