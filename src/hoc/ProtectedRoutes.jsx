import React, { useEffect, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { useNavigate } from "react-router";

const ProtectedRoutes = ({ children, isLoading }) => {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  useEffect(() => {
    if (!user && !isLoading) navigate("/login");
  }, [user]);

  if (user && !isLoading) return children;
};

export default ProtectedRoutes;
