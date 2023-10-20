import React from "react";
import Item from "../Utils/Item";

import {
  result,
  searchPhoto,
  searchText,
  searchLink,
} from "./SearchResult.module.css";
import { Link } from "react-router-dom";
const SearchResult = ({ id, photo, name }) => {
  return (
    <Item className={result} key={id}>
      <Link className={searchLink} to={`/meal/${id}`}>
        <img src={photo} alt={`${name} photo`} className={searchPhoto} />
        <p className={searchText}>{name}</p>
      </Link>
    </Item>
  );
};
export default SearchResult;
