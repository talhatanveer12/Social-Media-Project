import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const VerifyUser = (props) => {
  const { isUserLogin } = useSelector((state) => state.Auth);
  return isUserLogin ? (
    <React.Fragment>{props.children}</React.Fragment>
  ) : (
    <Navigate to="/Login" replace/>
  );
};

export default VerifyUser;
