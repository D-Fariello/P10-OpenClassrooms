import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, fetchUserInfo, selectUser } from "../features/SingInSlice"; // Import the login thunk action
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access the user from the Redux store
  const user = useSelector(selectUser);

  // You can log the user data here to see the state
  console.log("User from Redux store:", user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Dispatch login and wait for it to complete
      const response = await dispatch(login({ username, password }));

      // Log the login response for debugging
      console.log("Login response:", response);

      // Check if login was successful (fulfilled)
      if (response.meta.requestStatus === "fulfilled") {
        // Dispatch fetchUserInfo to get user details if needed
        await dispatch(fetchUserInfo());

        // Redirect to the user page after successful login
        navigate("/user");
      } else {
        console.log("Login failed, response not fulfilled");
      }
    } catch (error) {
      console.log("Login failed:", error); // Error handling
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
};

export default SignIn;
