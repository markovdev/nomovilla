import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};

export default useAuthContext;
