import React, { useEffect } from "react";
import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import Heading from "../components/common/Heading/Heading";
import SignupForm from "../components/SignupForm/SignupForm";
import useSignup from "../hooks/user/useSignup";
import Message from "../components/UI/Message";
import Section from "../components/Utils/Section";
import { sign } from "./Signup.module.css";
const Signup = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [valMsg, setValMsg] = useState("");
  const { user } = useAuthContext();
  const { signup, isLoading, error } = useSignup();
  const handleUserData = (e) => {
    const { name, value, id } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    if (userData.confirmPassword !== userData.password)
      setValMsg("Password does NOT match!");
    else setValMsg("");
  }, [userData]);
  if (!user) {
    return (
      <div className={sign}>
        {error && <Message message={error} status="fail" />}
        <SignupForm
          onSignup={() => signup(userData.email, userData.password)}
          isLoading={isLoading}
          valMsg={valMsg}
          handleUserData={handleUserData}
        />
      </div>
    );
  } else {
    return <Heading text="You must logout to create a new account!" isSecond />;
  }
};

export default Signup;
