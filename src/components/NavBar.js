import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "./UserContext"; // Import the context

const NavBar = () => {
  const { user, logout } = useUserContext(); // Access user and logout function

  return (
    <nav>
      {user ? (
        <>
          <span>Welcome, {user.username}</span>
          {/* Display user's email (or username if available) */}
          <button onClick={logout}>Logout</button> {/* Logout button */}
        </>
      ) : (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
