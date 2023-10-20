import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/http";
import Form from "../UI/Form";
import Input from "../UI/Input";
import Meal from "../../containers/Home/Meals/Meal/Meal";
import usePagination from "../../hooks/usePagination";
import Grid from "../../hoc/Layout/Grid";
import Button from "../Utils/Button";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useLocation, useNavigate } from "react-router";
import Loader from "../UI/Loader";
import Section from "../Utils/Section";
const MealsSearch = () => {
  const { sendRequest, data, error, isLoading } = useHttp();
  const { meals, nextPage, prevPage, curPage, totalPages } = usePagination({
    data: data?.data?.meals,
  });
  const [name, setName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [mealName, setMealName] = useState(queryParams.get("meal") || "");
  let typingTimer;

  const handlleNameChange = (e) => {
    const val = e.target.value;
    clearTimeout(typingTimer);
    queryParams.set("meal", e.target.value);

    navigate(`?${queryParams.toString()}`);
    typingTimer = setTimeout(() => {
      setMealName(val);
    }, 500);
  };
  useEffect(() => {
    sendRequest(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
    );
  }, [mealName]);
  return (
    <Section>
      <Form>
        <Input placeholder="Pizza, Sushi,..." onChange={handlleNameChange} />
      </Form>
      <Button onClick={prevPage}>
        <MdChevronLeft />
      </Button>{" "}
      <Button onClick={nextPage} disabled={curPage > totalPages}>
        <MdChevronRight />
      </Button>{" "}
      <Grid isAuto>
        {!isLoading ? (
          meals?.map((meal) => (
            <Meal
              name={meal.strMeal}
              category={meal.strCategory}
              photo={meal.strMealThumb}
              id={meal.idMeal}
            />
          ))
        ) : (
          <Loader isFull />
        )}
      </Grid>
    </Section>
  );
};

export default MealsSearch;
