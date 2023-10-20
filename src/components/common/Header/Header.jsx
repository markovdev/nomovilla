import React, { Component } from "react";
import { header, logo } from "./Header.module.css";
import Logo from "../../../assets/img/logo.png";

import SearchBar from "./SearchBar/SearchBar";
import UserHeader from "./UserHeader/UserHeader";
import { Link } from "react-router-dom";

const Showcase = () => {
  return (
    <header className={header}>
      <Link to="/">
        <img className={logo} src={Logo} />
      </Link>
      <SearchBar />
      <UserHeader />
    </header>
  );
};
export default Showcase;
