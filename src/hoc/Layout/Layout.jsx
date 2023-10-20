import React from "react";
import Header from "../../components/common/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import { container, main } from "./Layout.module.css";
import Loader from "../../components/UI/Loader";
import Content from "../Content";
import Copyright from "../../components/Copyright/Copyright";

const Layout = ({ children, message, isLoading }) => {
  return (
    <div className={container}>
      <Header />
      <Content>
        <Sidebar />
        <main className={main}>
          {/* Message Component */}
          {message ? message : null}
          {isLoading ? <Loader isFull /> : children}
        </main>
      </Content>
    </div>
  );
};
export default Layout;
