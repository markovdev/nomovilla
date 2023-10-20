import React from "react";
import { second, forth } from "./Heading.module.css";
const Heading = ({ isSecond, isThird, isForth, text }) => {
  return (
    <>
      {isSecond && <h2 className={second}>{text}</h2>}{" "}
      {isForth && <h4 className={forth}>{text}</h4>}
    </>
  );
};

export default Heading;
