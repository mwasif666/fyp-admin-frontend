// PrivateRoute.js
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { userToken } = useContext(AuthContext);
  return userToken === null ? <Navigate to={"/login"} /> : <Outlet />;
};

export default PrivateRoute;
