import React, { Component } from "react";

const Item = ({ className, children }) => {
  return (
    <li className={className ? className + " u-list__item" : '"u-list__item'}>
      {children}
    </li>
  );
};
export default Item;
