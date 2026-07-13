import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app you would send the data to an API
    console.log({ name, email, message });
    setSubmitted(true);
    // Reset form
    setName("");
    setEmail("");
    setMessage("");
    setTimeout(() => setSubmitted(false), 3000);
  };

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
            maxWidth: "700px",
            width: "100%",
            background: "#fff",
            borderRadius: "24px",
            padding: "40px",
            boxShadow: "0 15px 35px rgba(0,0,0,.08)",
          }}
        >
          <h1
            style={{
              color: "#A31D1D",
              fontSize: "36px",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            Contact Us
          </h1>
          <p
            style={{
              color: "#666",
              textAlign: "center",
              marginBottom: "30px",
              fontSize: "16px",
            }}
          >
            Have questions or feedback? We’d love to hear from you.
          </p>

          {submitted ? (
            <div
              style={{
                background: "#e8f5e9",
                color: "#2e7d32",
                padding: "15px",
                borderRadius: "10px",
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              ✅ Message sent! We’ll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: 600,
                  }}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "12px",
                    border: "1px solid #ddd",
                    fontSize: "15px",
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: 600,
                  }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "12px",
                    border: "1px solid #ddd",
                    fontSize: "15px",
                  }}
                />
              </div>

              <div style={{ marginBottom: "25px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: 600,
                  }}
                >
                  Message
                </label>
                <textarea
                  rows={6}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "12px",
                    border: "1px solid #ddd",
                    fontSize: "15px",
                    resize: "vertical",
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "16px",
                  border: "none",
                  borderRadius: "12px",
                  background: "#A31D1D",
                  color: "#fff",
                  fontSize: "18px",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#D84040")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#A31D1D")
                }
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}