import "./Login.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await authService.login({
        email,
        password,
      });

      localStorage.setItem(
        "token",
        response.access_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );

      if (response.user.role === "CUSTOMER") {
        navigate("/customer/dashboard");
      } else if (response.user.role === "PROVIDER") {
        navigate("/provider/dashboard");
      } else if (response.user.role === "ADMIN") {
        navigate("/admin/dashboard");
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="overlay">
          <h1>Welcome Back!</h1>

          <p>
            Book trusted professionals anytime,
            anywhere with BookEase.
          </p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2>Sign In</h2>

          <p>Login to continue to your account.</p>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />
            </div>

            {error && (
              <p
                style={{
                  color: "red",
                  marginBottom: "15px",
                  fontWeight: 600,
                }}
              >
                {error}
              </p>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="login-footer">
            <p>Don't have an account?</p>

            <Link to="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}