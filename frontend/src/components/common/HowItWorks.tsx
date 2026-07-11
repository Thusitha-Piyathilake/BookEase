import "./HowItWorks.css";
import { FaSearch, FaCalendarCheck, FaSmile } from "react-icons/fa";

export default function HowItWorks() {
  return (
    <section className="how-section">

      <div className="container">

        <div className="section-title">
          <h2>How BookEase Works</h2>
          <p>
            Booking trusted professionals has never been easier.
          </p>
        </div>

        <div className="steps">

          <div className="step-card">

            <div className="step-number">
              1
            </div>

            <div className="step-icon">
              <FaSearch />
            </div>

            <h3>Find a Service</h3>

            <p>
              Browse hundreds of trusted services near you.
            </p>

          </div>

          <div className="step-card">

            <div className="step-number">
              2
            </div>

            <div className="step-icon">
              <FaCalendarCheck />
            </div>

            <h3>Book Instantly</h3>

            <p>
              Select your preferred provider and schedule your booking.
            </p>

          </div>

          <div className="step-card">

            <div className="step-number">
              3
            </div>

            <div className="step-icon">
              <FaSmile />
            </div>

            <h3>Enjoy the Service</h3>

            <p>
              Sit back, relax and leave a review after completion.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}