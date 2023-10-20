import React, { useState } from "react";
import Modal from "../UI/Modal";
import { v4 as uuid } from "uuid";
import { deleteUser } from "firebase/auth";
import { auth } from "../../firebase";
import { deleteBtn } from "./DeleteUser.module.css";
import { useNavigate } from "react-router";
import Section from "../Utils/Section";
import useAuthContext from "../../hooks/useAuthContext";
const DeleteUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const showConfirm = () => setIsOpen(!isOpen);
  const { dispatch } = useAuthContext();
  const handleDelete = async (e) => {
    try {
      const res = await deleteUser(auth.currentUser);
      setIsOpen(false);
      // Add Delete dispatch
      dispatch({
        type: "DELETE",
      });
      navigate("/");
    } catch (err) {
      setIsOpen(false);
    }
  };
  return (
    <Section>
      <button onClick={showConfirm} className={deleteBtn}>
        Delete Your Account
      </button>
      {isOpen && (
        <Modal
          open={isOpen}
          onYesCB={handleDelete}
          onNoCB={() => setIsOpen(false)}
          key={uuid()}
        />
      )}
    </Section>
  );
};

export default DeleteUser;
