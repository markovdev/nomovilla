import React from "react";
import { input, label, control } from "./Input.module.css";
const Input = ({
  type,
  placeholder,
  id,
  onChange,
  val,
  label: labelText,
  name,
  disabled,
  isReset,
}) => {
  return (
    <div className={control}>
      <label htmlFor={id} className={label}>
        {labelText}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        className={!isReset && input}
        name={name ? name : ""}
        defaultValue={"" || val}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
