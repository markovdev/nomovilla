import React from "react";
import { pagination, arrow, icon, nextArrow } from "./Pagination.module.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
const Pagination = ({ next, prev, deactive, activeNext, activePrev }) => {
  return (
    <div className={pagination}>
      <button
        className={`${arrow} ${activePrev ? nextArrow : ""}`}
        onClick={prev}
      >
        <MdChevronLeft className={icon} />
      </button>
      <button
        className={`${arrow} ${activeNext ? nextArrow : ""}`}
        onClick={next}
      >
        <MdChevronRight className={icon} />
      </button>
    </div>
  );
};

export default Pagination;
