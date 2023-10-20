import React from "react";
import Item from "../Utils/Item";
import { link } from "./CopyrightLink.module.css";
const CopyrightLink = ({ children, to }) => {
  return (
    <Item>
      <a href={to} className={link} target="_blank">
        {children}
      </a>
    </Item>
  );
};

export default CopyrightLink;
