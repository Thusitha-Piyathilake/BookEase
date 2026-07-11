import "./Testimonials.css";

const providers = [
  {
    id: 1,
    name: "John Perera",
    job: "Professional Electrician",
    image:
      "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.9,
    location: "Colombo",
    price: "Rs. 3,500",
  },
  {
    id: 2,
    name: "Nimali Silva",
    job: "Home Cleaning Expert",
    image:
      "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5.0,
    location: "Negombo",
    price: "Rs. 4,000",
  },
  {
    id: 3,
    name: "Kasun Fernando",
    job: "Professional Painter",
    image:
      "https://randomuser.me/api/portraits/men/62.jpg",
    rating: 4.8,
    location: "Kandy",
    price: "Rs. 6,500",
  },
];

export default function Testimonials() {
  return (
    <section className="providers-section">

      <div className="container">

        <div className="section-title">
          <h2>Featured Professionals</h2>
          <p>
            Meet our highest rated service providers.
          </p>
        </div>

        <div className="provider-grid">

          {providers.map((provider) => (

            <div
              className="provider-card"
              key={provider.id}
            >

              <img
                src={provider.image}
                alt={provider.name}
              />

              <h3>{provider.name}</h3>

              <span className="profession">
                {provider.job}
              </span>

              <div className="rating">
                ⭐ {provider.rating}
              </div>

              <p>📍 {provider.location}</p>

              <h4>{provider.price}</h4>

              <button>
                View Profile
              </button>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}