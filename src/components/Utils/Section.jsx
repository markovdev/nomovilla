import React, { Component } from "react";
import { section, sectionBorder } from "./Section.module.css";
const Section = ({ className, children, isBorder, isReset }) => {
  return (
    <section
      className={` ${!isReset ? section : ""}  ${
        isBorder ? sectionBorder : ""
      } ${className ? className : ""}`}
    >
      {children}
    </section>
  );
};
export default Section;
