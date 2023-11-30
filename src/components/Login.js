import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "./UserContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useUserContext();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Reset specific error message when user starts typing again
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.email) {
      tempErrors.email = "Email cannot be empty";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.password) {
      tempErrors.password = "Password cannot be empty";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) {
      try {
        const response = await axios.post(
          "http://localhost:3089/api/users/login",
          formData
        );
        login({ username: response.data.username, token: response.data.token }); // Update based on your actual response structure
        navigate("/");
      } catch (error) {
        setLoginMessage("Invalid email or password");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <button type="submit">Login</button>
      {loginMessage && <p className="error">{loginMessage}</p>}
      <p>
        Not a member? <Link to="/register">Register</Link>
      </p>
    </form>
  );
};

export default Login;
