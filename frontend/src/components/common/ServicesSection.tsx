import "./ServicesSection.css";
import {
  FaBroom,
  FaBolt,
  FaPaintRoller,
  FaTools,
  FaGraduationCap,
  FaCut,
} from "react-icons/fa";

const services = [
  {
    icon: <FaBroom />,
    title: "House Cleaning",
    description: "Professional home cleaning services.",
    price: "Rs. 4,500",
  },
  {
    icon: <FaBolt />,
    title: "Electrical",
    description: "Certified electricians for all repairs.",
    price: "Rs. 3,000",
  },
  {
    icon: <FaPaintRoller />,
    title: "Painting",
    description: "Interior & exterior painting experts.",
    price: "Rs. 6,500",
  },
  {
    icon: <FaTools />,
    title: "Plumbing",
    description: "Quick plumbing installation & repairs.",
    price: "Rs. 3,500",
  },
  {
    icon: <FaGraduationCap />,
    title: "Tutoring",
    description: "Experienced tutors for all subjects.",
    price: "Rs. 2,500",
  },
  {
    icon: <FaCut />,
    title: "Beauty Care",
    description: "Salon and beauty services at home.",
    price: "Rs. 5,000",
  },
];

export default function ServicesSection() {
  return (
    <section className="services-section">

      <div className="container">

        <div className="section-header">
          <h2>Popular Services</h2>
          <p>
            Find trusted professionals for every service you need.
          </p>
        </div>

        <div className="services-grid">

          {services.map((service, index) => (
            <div className="service-card" key={index}>

              <div className="service-icon">
                {service.icon}
              </div>

              <h3>{service.title}</h3>

              <p>{service.description}</p>

              <span>{service.price}</span>

              <button>Book Now</button>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}