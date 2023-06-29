import React, { useState, useTimeout } from "react";
import { Navigate } from "react-router-dom";
import { useLocalState } from "../utils/useLocalStorage";
import { toast } from "react-toastify";
import { useJwt } from "react-jwt";

const PrivateRoute = ({ children }) => {
  let [userToken, setUserToken] = useLocalState("", "jwt");
  // const { decodedToken, isExpired } = useJwt(userToken);

  // if (userToken) {
  //   console.log("token", decodedToken, "is expired?", isExpired);
  //   // if (decodedToken || isExpired === false) {
  //   //   //session expires after 10 minutes
  //   //   // setTimeout(() => {
  //   //   //   setUserToken("");
  //   //   //   toast.error("Login timeout, Please log in again");
  //   //   // }, 600000);
  //   // }
  // }

  return userToken ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
