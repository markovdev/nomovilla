import React from "react";
import { form, colForm, formErr, formWidth } from "./Form.module.css";
const Form = ({
  className,
  onSubmit,
  children,
  isCol,
  valMsg,
  isFlex = true,
}) => {
  return (
    <form
      className={`${form} ${className ? className : ""} ${
        isCol ? colForm : ""
      } ${!isFlex ? formWidth : ""}`}
      onSubmit={onSubmit}
    >
      <p className={formErr}>{valMsg}</p>
      {children}
    </form>
  );
};

export default Form;
