import React, { useState } from "react";
import Item from "../Utils/Item";
import { Link, NavLink } from "react-router-dom";
import {
  sidebarLink,
  sidebarItem,
  sidebarLinkActive,
  activeItem,
} from "./SidebarLink.module.css";
const SidebarLink = ({ to, children }) => {
  return (
    <Item className={sidebarItem}>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink
        }
      >
        {children}
      </NavLink>
    </Item>
  );
};

export default SidebarLink;
