import React, { useState } from "react";

import useAuthContext from "../../hooks/useAuthContext";
import {
  MdBookmark,
  MdDashboard,
  MdHome,
  MdLogout,
  MdMenu,
  MdRestaurant,
} from "react-icons/md";
import List from "../Utils/List";
import Item from "../Utils/Item";
import {
  sidebar,
  sidebarList,
  icon,
  overlay,
  overlayScaled,
  logoutBtn,
  menuBtn,
  sidebarListActive,
} from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import SidebarLink from "./SidebarLink";
import Copyright from "../Copyright/Copyright";
import { useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { auth } from "../../firebase";
const Sidebar = () => {
  const { dispatch, user: curUserAuth } = useAuthContext();
  const [user, setUser] = useLocalStorage("user");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const toggleMenu = () => {
    setShow(!show);
  };
  const logout = (e) => {
    e.preventDefault();
    //  1) Remove user from localStorage
    localStorage.removeItem("user");
    // 2) Set user to null in auth context
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };
  // Auto logout
  const autoLogout = (tokenExp) => {
    const unitlLogout = tokenExp - Date.now();
    if (unitlLogout > 0) {
      setTimeout(() => {
        logout();
      }, unitlLogout);
    }
  };
  useEffect(() => {
    autoLogout(auth.currentUser?.stsTokenManager?.expirationTime);
  }, [user]);
  return (
    <>
      <nav className={sidebar}>
        {" "}
        <button onClick={toggleMenu} className={menuBtn}>
          <MdMenu />
        </button>
        <div className={`${overlay} ${show ? overlayScaled : ""}`}></div>
        <List
          className={`${sidebarList} ${show ? sidebarListActive : ""}`}
          isCol
        >
          <SidebarLink to="/">
            <MdHome className={icon} />
            <span>Home</span>
          </SidebarLink>
          <SidebarLink to="/meals">
            <MdRestaurant className={icon} /> <span>Meals</span>
          </SidebarLink>

          {curUserAuth ? (
            <>
              <SidebarLink text="Dashboard" to="/me">
                <MdDashboard className={icon} /> <span>Dashboard</span>{" "}
              </SidebarLink>
              <SidebarLink to="/bookmarks">
                <MdBookmark className={icon} />
                <span>Bookmarks</span>
              </SidebarLink>
              <Item className="sidebar__item" text="Home" link="#">
                <button onClick={logout} className={logoutBtn}>
                  <MdLogout className={icon} />
                  Logout
                </button>{" "}
              </Item>{" "}
            </>
          ) : null}
        </List>{" "}
        <Copyright />
      </nav>
    </>
  );
};
export default Sidebar;
