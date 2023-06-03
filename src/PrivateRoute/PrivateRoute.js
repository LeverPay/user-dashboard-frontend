import React from "react";
import { Navigate } from "react-router-dom";
import { useLocalState } from "../utils/useLocalStorage";

const PrivateRoute = ({ children }) => {
  const [userToken, setUserToken] = useLocalState("", "jwt");

  return userToken ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
