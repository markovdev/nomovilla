import React from "react";
import Input from "../UI/Input";
import Form from "../UI/Form";
import Button from "../Utils/Button";
import { Link } from "react-router-dom";
import { formText, formLink } from "./LoginForm.module.css";
const LoginForm = ({ onSubmit, dataCb, isLoading, disabled }) => {
  return (
    <Form isCol onSubmit={onSubmit}>
      <Input
        label="Email"
        placeholder="user@nomovilla.com"
        id="email"
        name="email"
        onChange={dataCb}
      />
      <Input
        label="Password"
        type="password"
        placeholder="********"
        name="password"
        id="password"
        onChange={dataCb}
      />
      <Button text="Login" isLoading={isLoading} disabled={disabled} />
      <p className={formText}>
        Forgot your password?, no problem click{" "}
        <Link to="/forgot-password" className={formLink}>
          Reset
        </Link>
        .
      </p>
    </Form>
  );
};

export default LoginForm;
