import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const VerifyUser = (props) => {
  const { isAuthenticated } = useSelector((state) => state.Auth);
  return isAuthenticated ? (
    <React.Fragment>{props.children}</React.Fragment>
  ) : (
    <Navigate to="/Login" replace/>
  );
};

export default VerifyUser;
