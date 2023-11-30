import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [registrationMessage, setRegistrationMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = async () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.username) {
      tempErrors.username = "Username is required";
      isValid = false;
    } else if (formData.username.length < 3) {
      tempErrors.username = "Username must be at least 3 characters long";
      isValid = false;
    }

    if (!formData.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formData.password
      )
    ) {
      tempErrors.password =
        "Password must be 8 characters including 1 uppercase letter, 1 lowercase letter, and 1 symbol";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = await validateForm();

    if (isFormValid) {
      try {
        const response = await axios.post(
          "http://localhost:3089/api/users/register",
          formData
        );
        // Registration successful, navigate to login page
        navigate("/login");
      } catch (error) {
        if (error.response && error.response.data) {
          setErrors({ ...errors, email: "Email already exists" });
        } else {
          setRegistrationMessage("An error occurred during registration.");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <p>{errors.username}</p>}
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
      </div>
      <button type="submit">Register</button>
      {registrationMessage && <p>{registrationMessage}</p>}
      <p>
        Already a member? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};

export default Register;
