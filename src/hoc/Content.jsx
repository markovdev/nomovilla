import React, { Component } from "react";
import { content } from "./Content.module.css";
const Content = ({ children }) => {
  return <div className={content}>{children}</div>;
};
export default Content;
