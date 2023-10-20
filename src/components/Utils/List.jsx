import React, { Component } from "react";
import { list, colList } from "./List.module.css";
const List = ({ children, className, isCol }) => {
  return (
    <ul
      className={`${list} ${className ? className : ""} ${
        isCol ? ` ${colList}` : ""
      }`}
    >
      {children}
    </ul>
  );
};
export default List;
