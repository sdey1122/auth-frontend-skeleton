import React from "react";
import { useUserContext } from "./UserContext";

const Home = () => {
  const { user } = useUserContext();

  return (
    <div>
      Home Page
      {user && <p>Welcome, {user.username}</p>}{" "}
      {/* Display user's email or username */}
    </div>
  );
};

export default Home;
