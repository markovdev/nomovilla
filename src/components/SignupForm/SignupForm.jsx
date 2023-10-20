import React from "react";
import Input from "../UI/Input";

import Button from "../Utils/Button";
import Form from "../UI/Form";

const SignupForm = ({ onSignup, valMsg, handleUserData, isLoading }) => {
  const handler = (e) => {
    e.preventDefault();
    onSignup();
  };
  return (
    <Form isCol onSubmit={handler} valMsg={valMsg}>
      <Input
        placeholder="user@example.com"
        label="Email"
        name="email"
        onChange={handleUserData}
      />
      <Input
        type="password"
        placeholder="Password"
        label="Password"
        name="password"
        onChange={handleUserData}
      />
      <Input
        type="password"
        placeholder="Confirm your password"
        label="Confirm Password"
        name="confirmPassword"
        onChange={handleUserData}
      />
      <Button text="Signup" disabled={valMsg !== ""} isLoading={isLoading} />
    </Form>
  );
};

export default SignupForm;
