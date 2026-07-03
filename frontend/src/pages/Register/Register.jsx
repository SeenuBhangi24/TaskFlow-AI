import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

// Import Register API
import { registerUser } from "../../services/authService";

function Register() {

  // Navigation Hook
  const navigate = useNavigate();

  // Store Form Data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Store Success/Error Message
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

  // Handle Register
  async function handleSubmit(event) {

    event.preventDefault();

    try {

      // Call Register API
      const data = await registerUser(formData);

      console.log(data);

      // Show Success Message
      setMessage("Registration Successful");

      setMessageType("success");

      // Clear Form
      setFormData({
        name: "",
        email: "",
        password: "",
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);

    }

    catch (error) {

        console.log(error);

        console.log(error.response);

        console.log(error.response.data);

        setMessage("Registration Failed");

        setMessageType("error");

    }

  }

  return (

    <div className="register-container">

      <div className="register-card">

        <h1>Create Account</h1>

        <p className="subtitle">
          Join TaskFlow AI 🚀
        </p>

        {/* Success / Error Message */}

        {
          message &&
          <div className={`message ${messageType}`}>
            {message}
          </div>
        }

        <form onSubmit={handleSubmit}>

          {/* Name */}

          <div className="form-group">

            <label>Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>

          {/* Email */}

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>

          {/* Register Button */}

          <button
            type="submit"
            className="register-btn"
          >
            Register
          </button>

        </form>

        <p className="bottom-text">

          Already have an account?

          <Link to="/">
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Register;