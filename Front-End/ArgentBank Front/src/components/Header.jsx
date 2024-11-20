import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../actions/user.actions";

const Header = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userReducer.token);
  const userName = useSelector(
    (state) => state.userReducer.user?.body?.userName
  );

  const handleLogout = () => {
    // Clear localStorage and dispatch logout
    localStorage.clear();
    dispatch(logoutUser());
  };

  return (
    <header>
      <nav className="main-nav">
        <NavLink to="/" className="main-nav-logo">
          <img
            src="./img/argentBankLogo.png"
            alt="Argent Bank Logo"
            className="main-nav-logo-image"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </NavLink>
        {token ? (
          <div className="main-nav-user-info">
            <span className="main-nav-userName">
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
