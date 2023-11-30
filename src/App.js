import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import { UserProvider } from "./components/UserContext"; // Import UserProvider

const App = () => {
  return (
    <UserProvider>
      {" "}
      {/* Wrap the components with UserProvider */}
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Add other routes as needed */}
      </Routes>
    </UserProvider>
  );
};

export default App;
