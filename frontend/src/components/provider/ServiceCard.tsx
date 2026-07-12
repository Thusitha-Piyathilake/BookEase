import "./ServiceCard.css";

interface Props {
  image: string;
  title: string;
  category: string;
  price: number;

  onEdit: () => void;
  onDelete: () => void;
}

export default function ServiceCard({
  image,
  title,
  category,
  price,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="service-card">
      <img src={image} alt={title} />

      <div className="service-info">
        <h3>{title}</h3>

        <p>{category}</p>

        <h2>Rs. {Number(price).toFixed(2)}</h2>
      </div>

      <div className="service-actions">
        <button
          className="edit-btn"
          onClick={onEdit}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}