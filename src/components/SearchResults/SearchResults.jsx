import React from "react";
import List from "../Utils/List";

import { results } from "./SearchResults.module.css";
const SearchResults = ({ children }) => {
  return (
    <List className={results} isCol>
      {children}
    </List>
  );
};

export default SearchResults;
