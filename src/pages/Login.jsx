import React, { useState } from "react";
import { login } from "./Login.module.css";
import Message from "../components/UI/Message";
import useAuthContext from "../hooks/useAuthContext";
import Heading from "../components/common/Heading/Heading";
import LoginForm from "../components/LoginForm/LoginForm";
import useLogin from "../hooks/user/useLogin";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { user: curAuthUser } = useAuthContext();

  const { loginHandler, isLoading, error } = useLogin();
  const handleUserData = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    loginHandler(userData.email, userData.password);
  };
  if (!curAuthUser) {
    return (
      <div className={login}>
        {error && <Message message={error} status="fail" />}
        <LoginForm
          dataCb={handleUserData}
          isLoading={isLoading}
          onSubmit={handleLogin}
          disabled={userData.email === "" || userData.password === ""}
        />
      </div>
    );
  } else {
    return <Heading text="You are already logged in!" isSecond />;
  }
};

export default Login;
