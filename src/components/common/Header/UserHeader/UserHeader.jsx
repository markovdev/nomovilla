import React, { Component } from "react";

import { authLink, username, userHeader } from "./UserHeader.module.css";
import { Link } from "react-router-dom";
import List from "../../../Utils/List";
import Item from "../../../Utils/Item";
import useAuthContext from "../../../../hooks/useAuthContext";
const UserHeader = () => {
  const { user } = useAuthContext();

  return (
    <nav className={userHeader}>
      {!user ? (
        <List>
          <Item>
            <Link to="/login" className={authLink}>
              Login
            </Link>
          </Item>{" "}
          <Item>
            <Link to="/signup" className={authLink}>
              Signup
            </Link>
          </Item>
        </List>
      ) : (
        <p className={username}>{user.name || user.email}</p>
      )}
    </nav>
  );
};

export default UserHeader;
