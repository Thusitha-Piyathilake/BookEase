import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import authService from "../../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState<"CUSTOMER" | "PROVIDER">("CUSTOMER");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // ----- Custom Popup State -----
  const [popup, setPopup] = useState<{
    visible: boolean;
    message: string;
    onConfirm?: () => void;
  }>({
    visible: false,
    message: "",
    onConfirm: undefined,
  });

  const showPopup = (message: string, onConfirm?: () => void) => {
    setPopup({ visible: true, message, onConfirm });
  };

  const closePopup = () => {
    if (popup.onConfirm) {
      popup.onConfirm();
    }
    setPopup({ visible: false, message: "", onConfirm: undefined });
  };
  // ----- End Custom Popup -----

  const register = async () => {
    // Name validation
    if (!name.trim()) {
      showPopup("Full name is required.");
      return;
    }

    if (name.trim().length < 3) {
      showPopup("Full name must be at least 3 characters.");
      return;
    }

    // Email validation
    if (!email.trim()) {
      showPopup("Email is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      showPopup("Please enter a valid email address.");
      return;
    }

    // Phone validation (optional)
    if (phone.trim() !== "") {
      const phoneRegex = /^[0-9]{10}$/;

      if (!phoneRegex.test(phone)) {
        showPopup("Phone number must contain exactly 10 digits.");
        return;
      }
    }

    // Password validation
    if (!password) {
      showPopup("Password is required.");
      return;
    }

    if (password.length < 6) {
      showPopup("Password must be at least 6 characters.");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!passwordRegex.test(password)) {
      showPopup(
        "Password must contain at least one uppercase letter, one lowercase letter and one number."
      );
      return;
    }

    // Confirm password
    if (!confirmPassword) {
      showPopup("Please confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      showPopup("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await authService.register({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        role,
      });

      // Show success popup and navigate on OK
      showPopup("Registration successful. Please login.", () => {
        navigate("/login");
      });
    } catch (error: any) {
      console.error(error);

      showPopup(
        error?.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // Helper to handle password input from contentEditable
  const handlePasswordInput = (e: React.FormEvent<HTMLDivElement>) => {
    const raw = e.currentTarget.textContent || "";
    setPassword(raw);
  };

  // Helper to handle paste (to avoid pasting formatted text)
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, pasted);
  };

  return (
    <>
      {/* Main form */}
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg,#F8F2DE,#FFFDF7)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "540px",
            background: "#fff",
            borderRadius: "24px",
            padding: "40px",
            boxShadow: "0 20px 50px rgba(0,0,0,.12)",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "35px",
            }}
          >
            <h1
              style={{
                color: "#A31D1D",
                marginBottom: "10px",
              }}
            >
              Create Account
            </h1>

            <p
              style={{
                color: "#666",
              }}
            >
              Join BookEase today.
            </p>
          </div>

          {/* Role */}

          <label style={labelStyle}>
            Register As
          </label>

          <select
            value={role}
            onChange={(e) =>
              setRole(
                e.target.value as
                  | "CUSTOMER"
                  | "PROVIDER"
              )
            }
            style={inputStyle}
          >
            <option value="CUSTOMER">
              Customer
            </option>

            <option value="PROVIDER">
              Service Provider
            </option>
          </select>

          {/* Name */}

          <label style={labelStyle}>
            Full Name
          </label>

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="John Doe"
            style={inputStyle}
          />

          {/* Email */}

          <label style={labelStyle}>
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="john@email.com"
            style={inputStyle}
          />

          {/* Phone */}

          <label style={labelStyle}>
            Phone Number
          </label>

          <input
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            placeholder="0771234567"
            style={inputStyle}
          />

          {/* Password - contentEditable div */}

          <label style={labelStyle}>
            Password
          </label>

          <div
            contentEditable
            onInput={handlePasswordInput}
            onPaste={handlePaste}
            suppressContentEditableWarning
            style={
              {
                ...inputStyle,
                WebkitTextSecurity: "disc",
                textSecurity: "disc",
                outline: "none",
              } as React.CSSProperties
            }
          >
            {/* The text content will be the password */}
          </div>

          {/* Confirm Password */}

          <label style={labelStyle}>
            Confirm Password
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            style={inputStyle}
          />

          <button
            onClick={register}
            disabled={loading}
            style={{
              width: "100%",
              marginTop: "30px",
              padding: "16px",
              background: "#A31D1D",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              fontSize: "17px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>

          <div
            style={{
              textAlign: "center",
              marginTop: "25px",
            }}
          >
            Already have an account?{" "}

            <Link
              to="/login"
              style={{
                color: "#A31D1D",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* ----- Custom Popup Modal ----- */}
      {popup.visible && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "20px",
          }}
          onClick={closePopup} // click outside to close
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "40px",
              maxWidth: "420px",
              width: "100%",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <p
              style={{
                fontSize: "18px",
                marginBottom: "30px",
                color: "#333",
                lineHeight: 1.5,
              }}
            >
              {popup.message}
            </p>
            <button
              onClick={closePopup}
              style={{
                padding: "12px 40px",
                background: "#A31D1D",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
      {/* ----- End Custom Popup ----- */}
    </>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  marginTop: "18px",
  marginBottom: "8px",
  fontWeight: 600,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  fontSize: "15px",
  boxSizing: "border-box",
  background: "#fff",
  minHeight: "52px",
};