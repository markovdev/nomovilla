import React from "react";
import Layout from "../hoc/Layout/Layout";
import Input from "../components/UI/Input";
import Form from "../components/UI/Form";
import Section from "../components/Utils/Section";
import Button from "../components/Utils/Button";
import { forgotPassword } from "./ForgotPassword.module.css";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import Heading from "../components/common/Heading/Heading";
import useFirebaseError from "../hooks/useFirebaseError";
import Message from "../components/UI/Message";
const ForgotPassword = () => {
  const { handleFirebaseErr, error } = useFirebaseError();
  const handleForgotPassword = async (e) => {
    try {
      e.preventDefault();
      const res = await sendPasswordResetEmail(auth, auth.currentUser.email);
    } catch (err) {
      handleFirebaseErr(err);
    }
  };
  return (
    <Section>
      {error && <Message message={error} status="fail" />}
      <div className={forgotPassword}>
        <h3 className="heading--tertiary">Forgot your password?</h3>
        <Heading text="Enter your email below to reset it." isForth />
        <Form onSubmit={handleForgotPassword} isCol>
          <Input placeholder="user@nomovilla.com" />
          <Button text={"Submit"} />
        </Form>
      </div>
    </Section>
  );
};

export default ForgotPassword;
