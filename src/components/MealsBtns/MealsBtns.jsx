import React from "react";
import Button from "../Utils/Button";
import { btnsContainer, btn } from "./MealsBtns.module.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
const MealsBtn = ({ curPage, onNextPage, onPrevPage, totalPages }) => {
  return (
    <div className={btnsContainer}>
      {" "}
      <Button
        className={`${btn}`}
        disabled={curPage === 1}
        onClick={onPrevPage}
        isReset
      >
        <MdChevronLeft />
      </Button>{" "}
      <Button
        className={`${btn}`}
        onClick={onNextPage}
        disabled={curPage >= totalPages}
        isReset
      >
        <MdChevronRight />
      </Button>{" "}
    </div>
  );
};

export default MealsBtn;
