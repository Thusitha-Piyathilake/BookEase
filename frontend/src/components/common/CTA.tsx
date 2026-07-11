import "./CTA.css";
import {
  FaUsers,
  FaBriefcase,
  FaCalendarCheck,
  FaStar,
} from "react-icons/fa";

export default function CTA() {
  return (
    <section className="stats-section">

      <div className="container">

        <div className="section-title">
          <h2>Trusted by Thousands</h2>

          <p>
            Join thousands of customers and service providers
            using BookEase every day.
          </p>
        </div>

        <div className="stats-grid">

          <div className="stat-card">
            <FaUsers className="stat-icon" />
            <h2>15K+</h2>
            <p>Happy Customers</p>
          </div>

          <div className="stat-card">
            <FaBriefcase className="stat-icon" />
            <h2>500+</h2>
            <p>Verified Providers</p>
          </div>

          <div className="stat-card">
            <FaCalendarCheck className="stat-icon" />
            <h2>10K+</h2>
            <p>Bookings Completed</p>
          </div>

          <div className="stat-card">
            <FaStar className="stat-icon" />
            <h2>4.9</h2>
            <p>Average Rating</p>
          </div>

        </div>

        <div className="cta-box">

          <h2>Ready to Book Your Next Service?</h2>

          <p>
            Discover trusted professionals near you and book
            your service in minutes.
          </p>

          <button>
            Get Started
          </button>

        </div>

      </div>

    </section>
  );
}