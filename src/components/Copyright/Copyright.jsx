import React from "react";
import { copyright, copyrightText } from "./Copyright.module.css";
import List from "../Utils/List";
import Item from "../Utils/Item";
import {
  AiFillInstagram,
  AiFillTwitterSquare,
  AiOutlineGlobal,
} from "react-icons/ai";
import CopyrightLink from "./CopyrightLink";
const Copyright = () => {
  return (
    <div className={copyright}>
      <p className={copyrightText}>
        This project was built by me for my portfolio
      </p>
      <List>
        <CopyrightLink to="https://www.markovdev.com/">
          <AiOutlineGlobal />
        </CopyrightLink>
        <Item>
          <CopyrightLink to="https://instagram.com/markov.dev?igshid=MzRlODBiNWFlZA==">
            <AiFillInstagram />
          </CopyrightLink>
        </Item>
        <Item>
          <CopyrightLink to="https://twitter.com/markov_dev">
            <AiFillTwitterSquare />
          </CopyrightLink>
        </Item>
      </List>
    </div>
  );
};

export default Copyright;
