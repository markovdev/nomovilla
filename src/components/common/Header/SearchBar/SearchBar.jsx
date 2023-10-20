import React, { useState, useRef, useEffect, useCallback } from "react";
import { FaBeer, FaSearch } from "react-icons/fa";
import SearchResult from "../../../SearchResults/SearchResult";
import SearchResults from "../../../SearchResults/SearchResults";
import useHttp from "../../../../hooks/http";
import Loader from "../../../UI/Loader";
import Form from "../../../UI/Form";
import Input from "../../../UI/Input";
import { search, searchInput, searchBtn } from "./SearchBar.module.css";
let timer;
const Search = (props) => {
  const [name, setName] = useState("");
  const { isLoading, sendRequest, error, data, clear } = useHttp();
  const handleSearchInput = (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => setName(e.target.value), 1000);
  };
  useEffect(() => {
    sendRequest(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`,
      "GET"
    );
  }, [name]);
  return (
    <div className={search}>
      <Form>
        <Input
          name="search"
          className={searchInput}
          placeholder="Pizza, Salad,..."
          type="search"
          onChange={handleSearchInput}
        />

        <button className={searchBtn}>
          <FaSearch />
        </button>
      </Form>

      {name !== "" && (
        <SearchResults>
          {name !== "" && !isLoading
            ? data?.data.meals?.map((meal) => (
                <SearchResult
                  id={meal.idMeal}
                  name={meal.strMeal}
                  photo={`${meal.strMealThumb}/preview`}
                />
              ))
            : "Loading...."}
        </SearchResults>
      )}
    </div>
  );
};
export default Search;
