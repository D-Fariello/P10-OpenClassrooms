import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchToken, fetchUserData } from "../../actions/user.actions";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useRef();
  const rememberMe = JSON.parse(localStorage.getItem("rememberMe"));
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (rememberMe) {
      setIsChecked(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      email: form.current[0].value,
      password: form.current[1].value,
    };
    console.log("Post data being sent to the server:", postData);

    if (form.current[2].checked) {
      localStorage.setItem("rememberMe", JSON.stringify(postData));
    } else {
      localStorage.removeItem("rememberMe");
    }
    dispatch(fetchToken(postData))
      .then((token) => {
        dispatch(fetchUserData(token)).then(() => {
          navigate("/user");
        });
      })
      .catch((error) => {
        console.log(error.response.status);
        throw error.message;
      });
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form ref={form} onSubmit={(e) => handleSubmit(e)}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              defaultValue={rememberMe ? rememberMe.email : ""}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              defaultValue={rememberMe ? rememberMe.password : ""}
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
