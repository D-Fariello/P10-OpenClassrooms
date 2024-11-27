import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchToken, fetchUserData } from "../../actions/user.actions";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rememberMe = JSON.parse(localStorage.getItem("rememberMe"));

  // Manage form data using useState
  const [email, setEmail] = useState(rememberMe ? rememberMe.email : "");
  const [password, setPassword] = useState(
    rememberMe ? rememberMe.password : ""
  );
  const [isChecked, setIsChecked] = useState(rememberMe ? true : false);
  const [error, setError] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  useEffect(() => {
    if (isChecked) {
      localStorage.setItem("rememberMe", JSON.stringify({ email, password }));
    } else {
      localStorage.removeItem("rememberMe");
    }
  }, [isChecked, email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = { email, password };

    // Handle saving to localStorage if "Remember Me" is checked
    if (isChecked) {
      localStorage.setItem("rememberMe", JSON.stringify(postData)); // Store email/password
    } else {
      localStorage.removeItem("rememberMe");
    }

    // Dispatch the login action and handle token
    dispatch(fetchToken(postData))
      .then((token) => {
        if (token) {
          // Store the token in sessionStorage
          sessionStorage.setItem("token", token);
          return dispatch(fetchUserData(token));
        } else {
          throw new Error("Invalid Token");
        }
      })
      .then((userData) => {
        // Store the user data in sessionStorage
        sessionStorage.setItem("user", JSON.stringify(userData));
        navigate("/user");
      })
      .catch((error) => {
        console.log("Request failed:", error);
        setError(true);
      });
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <input
              type="checkbox"
              id="remember-me"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
          {error && (
            <p className="error-message">
              Something went wrong
              <br />
              Please verify your credentials and try again
            </p>
          )}
        </form>
      </section>
    </main>
  );
};

export default SignIn;
