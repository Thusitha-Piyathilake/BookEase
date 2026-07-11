import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">

      <div className="container hero-content">

        <div className="hero-left">

          <h1>
            Book Trusted <span>Professionals</span>
            <br />
            In Minutes.
          </h1>

          <p>
            Discover trusted professionals for home services,
            repairs, beauty, cleaning, tutoring and much more.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">
              Explore Services
            </button>

            <button className="secondary-btn">
              Become a Provider
            </button>
          </div>

        </div>

        <div className="hero-right">

          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700"
            alt="Hero"
          />

        </div>

      </div>

    </section>
  );
}