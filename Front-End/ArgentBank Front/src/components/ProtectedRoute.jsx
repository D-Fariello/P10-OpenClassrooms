import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/SingInSlice";

// ProtectedRoute component that redirects to sign-in if user is not logged in
const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectUser);
  return user ? children : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
