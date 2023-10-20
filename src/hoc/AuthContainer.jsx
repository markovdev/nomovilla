import React from "react";
import { Outlet } from "react-router";

const AuthContainer = ({ children }) => {
  return <Outlet />;
};

export default AuthContainer;
