import "./Features.css";
import {
  FaShieldAlt,
  FaClock,
  FaStar,
  FaHeadset,
} from "react-icons/fa";

const features = [
  {
    icon: <FaShieldAlt />,
    title: "Verified Professionals",
    description:
      "Every service provider is verified to ensure quality and trust.",
  },
  {
    icon: <FaClock />,
    title: "Quick Booking",
    description:
      "Book trusted professionals in just a few clicks anytime.",
  },
  {
    icon: <FaStar />,
    title: "Top Rated Services",
    description:
      "Choose from highly rated providers based on real customer reviews.",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    description:
      "Our support team is always available whenever you need help.",
  },
];

export default function Features() {
  return (
    <section className="features">
      <div className="container">

        <div className="section-title">
          <h2>Why Choose BookEase?</h2>
          <p>
            We make booking local professionals easier, safer and faster.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}