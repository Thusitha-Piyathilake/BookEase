import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function About() {
  return (
    <>
      <Navbar />
      <main
        style={{
          minHeight: "calc(100vh - 200px)",
          background: "#F8F2DE",
          padding: "60px 20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            background: "#fff",
            borderRadius: "24px",
            padding: "50px",
            boxShadow: "0 15px 35px rgba(0,0,0,.08)",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              color: "#A31D1D",
              fontSize: "40px",
              marginBottom: "20px",
            }}
          >
            About BookEase
          </h1>
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.8,
              color: "#444",
              marginBottom: "20px",
            }}
          >
            BookEase is a trusted platform that connects customers with
            verified professionals for home services, repairs, beauty,
            cleaning, tutoring, and much more. Our mission is to make
            hiring reliable service providers simple, transparent, and
            hassle‑free.
          </p>
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.8,
              color: "#444",
            }}
          >
            Whether you need a plumber, an electrician, a tutor, or a
            cleaner – we’ve got you covered. Join thousands of satisfied
            customers and providers who trust BookEase every day.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}