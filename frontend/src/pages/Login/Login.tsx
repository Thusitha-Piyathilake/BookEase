import "./Login.css";

export default function Login() {
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

          <p>
            Login to continue to your account.
          </p>

          <form>

            <div className="form-group">

              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
              />

            </div>

            <div className="form-group">

              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
              />

            </div>

            <button type="submit">
              Login
            </button>

          </form>

          <div className="login-footer">

            <p>
              Don't have an account?
            </p>

            <a href="/register">
              Register
            </a>

          </div>

        </div>

      </div>

    </div>
  );
}