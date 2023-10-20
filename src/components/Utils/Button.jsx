import React, { Component } from "react";
import { btn, btnPrimary, btnRow } from "./Button.module.css";
const Button = ({
  disabled,
  className,
  children,
  text,
  isLoading,
  onClick,
  isReset,
  isRow,
}) => {
  return (
    <button
      className={`${isReset ? "" : `${btn} ${btnPrimary} `} ${
        className ? className : ""
      } ${isRow ? btnRow : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? "Loading..." : text}
      {children}
    </button>
  );
};
export default Button;
