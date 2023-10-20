import React, { useState } from "react";
import { grid, grid2, grid3, grid4, gridAuto } from "./Grid.module.css";
const Grid = ({ children, className, col, isAuto }) => {
  const [gridCols, setGridCols] = useState();
  const gridCheck = () => {
    if (col === 2) return grid2;
    else if (col === 3) return grid3;
    else if (col === 4) return grid4;
  };
  return (
    <div
      className={`${grid} ${isAuto && !col ? gridAuto : ""} ${
        col ? `${gridCheck()}` : ""
      } ${className ? className : ""}`}
    >
      {children}
    </div>
  );
};

export default Grid;
