import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

// Import Login API
import { loginUser } from "../../services/authService";

// Import Auth Context
import { useAuth } from "../../context/useAuth";

function Login() {

  // Navigation
  const navigate = useNavigate();

  // Get login function from Context API
  const { login } = useAuth();

  // Store Form Data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Store Message
  const [message, setMessage] = useState("");

  // Store Message Type
  const [messageType, setMessageType] = useState("");

  // Handle Input Change
  function handleChange(event) {

    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  }

  // Handle Login
  async function handleSubmit(event) {

    event.preventDefault();

    try {

      // Call Login API
      const data = await loginUser(formData);

      console.log(data);

      // Save Token using Context API
      console.log("Token from backend:", data.token);

        login(null, data.token);

        console.log("Saved Token:", localStorage.getItem("token"));

      setMessage("Login Successful");
      setMessageType("success");

      // Redirect to Dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {

      console.log(error);

      setMessage("Invalid Email or Password");
      setMessageType("error");

    }

  }

  return (
    <div className="login-container">

      <div className="login-card">

        <h1>TaskFlow AI</h1>

        <p className="subtitle">
          Welcome Back 👋
        </p>

        {/* Success / Error Message */}
        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          {/* Password */}
          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

        </form>

        <p className="bottom-text">

          Don't have an account?

          <Link to="/register">
            Register
          </Link>

        </p>

      </div>

    </div>
  );

}

export default Login;