import React from "react";
import Layout from "../hoc/Layout/Layout";
import ChangeUserInfo from "../components/ChangeUserInfo/ChangeUserInfo";
import ChangeUserPassword from "../components/ChangeUserPassword/ChangeUserPassword";
import DeleteUser from "../components/DeleteUser/DeleteUser";

const Me = () => {
  return (
    <>
      <ChangeUserInfo />

      <ChangeUserPassword />

      <DeleteUser />
    </>
  );
};

export default Me;
