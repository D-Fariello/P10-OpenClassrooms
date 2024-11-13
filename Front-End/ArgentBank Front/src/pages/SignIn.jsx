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
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (rememberMe) {
      setIsChecked(true);
    }
  }, [rememberMe]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      email,
      password,
    };

    // Handle saving to localStorage if "Remember Me" is checked
    if (isChecked) {
      localStorage.setItem("rememberMe", JSON.stringify(postData));
    } else {
      localStorage.removeItem("rememberMe");
    }

    // Dispatch the login action and handle token
    dispatch(fetchToken(postData))
      .then((token) => {
        if (token) {
          return dispatch(fetchUserData(token));
        } else {
          throw new Error("Token non valido");
        }
      })
      .then(() => {
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
              onChange={(e) => setIsChecked(e.target.checked)}
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
