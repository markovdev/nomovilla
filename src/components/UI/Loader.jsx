import React from "react";
import { loader, container, loaderFull, rel } from "./Loader.module.css";
const Loader = ({ isFull, isInline }) => {
  return (
    <div className={rel}>
      {isInline ? <span className={loader}></span> : ""}
      {isFull ? (
        <div className={container}>
          <span className={`${loaderFull} ${loader}`}></span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Loader;
