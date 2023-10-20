import React, { useState } from "react";
import {
  modal,
  modalContent,
  modalHeading,
  modalActions,
  modalBtn,
} from "./Modal.module.css";
import Button from "../Utils/Button";
import { v4 as uuid } from "uuid";
const Modal = ({ text, open, onYesCB, onNoCB }) => {
  const [isOpen, setIsOpen] = useState(open);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const handleYesClick = (e) => {
    onYesCB();
    closeModal();
  };
  const handleNoClick = (e) => {
    onNoCB();
    closeModal();
  };
  return (
    <>
      {isOpen && (
        <div className={modal}>
          <div className={modalContent}>
            <h3 className={modalHeading}>Are you sure you want to proceed?</h3>
            <div className={modalActions}>
              {" "}
              <Button text="Yes" onClick={handleYesClick} key={uuid()} />
              <Button
                text="No"
                onClick={handleNoClick}
                key={uuid()}
                className={modalBtn}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
