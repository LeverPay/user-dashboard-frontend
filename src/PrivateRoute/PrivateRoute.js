import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useLocalState } from "../utils/useLocalStorage";
import { toast } from "react-toastify";
import { useJwt } from "react-jwt";

const PrivateRoute = ({ children }) => {
  let [userToken, setUserToken] = useLocalState("", "jwt");

  const { isExpired } = useJwt(userToken);

  useEffect(() => {
    if (!userToken || isExpired) {
      toast.error("Login timeout, Please log in again");
    }
  }, [userToken, isExpired]);

  if (!userToken || isExpired) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default PrivateRoute;
