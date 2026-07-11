import "./ServiceCard.css";

interface Props {
  image: string;
  title: string;
  category: string;
  price: number;
}

export default function ServiceCard({
  image,
  title,
  category,
  price,
}: Props) {
  return (
    <div className="service-card">

      <img src={image} alt={title} />

      <div className="service-info">

        <h3>{title}</h3>

        <p>{category}</p>

        <h2>Rs. {price}</h2>

      </div>

      <div className="service-actions">

        <button className="edit-btn">
          Edit
        </button>

        <button className="delete-btn">
          Delete
        </button>

      </div>

    </div>
  );
}