import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../actions/user.actions";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.userReducer.token);
  const userName = useSelector(
    (state) => state.userReducer.user?.body?.userName
  );

  const handleLogout = () => {
    // Takes off the user data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Dispatch to update Redux
    dispatch(logoutUser());
  };

  const handleProfileClick = () => {
    navigate("/user");
  };

  return (
    <header>
      <nav className="main-nav">
        <NavLink
          to="/"
          className="main-nav-logo"
          onClick={() => {
            handleLogout();
          }}
        >
          <img
            src="./img/argentBankLogo.png"
            alt="Argent Bank Logo"
            className="main-nav-logo-image"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </NavLink>
        {token ? (
          <div className="main-nav-user-info">
            <span className="main-nav-userName" onClick={handleProfileClick}>
              <i className="fa fa-user-circle"></i>
              {userName || "Loading.."}
            </span>
            <button onClick={handleLogout} className="main-nav-item-out">
              <i className="fa fa-sign-out"></i>
              Sign Out
            </button>
          </div>
        ) : (
          <NavLink to="/sign-in" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
