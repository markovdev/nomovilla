import React, { useEffect, useState } from "react";
import Form from "../components/UI/Form";
import Input from "../components/UI/Input";
import Meal from "../components/Meal/Meal";
import usePagination from "../hooks/usePagination";
import Grid from "../hoc/Layout/Grid";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useLocation, useNavigate } from "react-router";
import useHttp from "../hooks/http";
import Loader from "../components/UI/Loader";
import Message from "../components/UI/Message";
import { mealsSearch, mealsText } from "./Meals.module.css";
import MealsBtns from "../components/MealsBtns/MealsBtns";
import Section from "../components/Utils/Section";
const MealsName = () => {
  const { sendRequest, data, error, isLoading } = useHttp();
  const { meals, nextPage, prevPage, curPage, totalPages } = usePagination({
    data: data?.data?.meals,
  });
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
    <>
      {error ? <Message msgs={[error.message]} status="fail" /> : null}
      <Section>
        <div className={mealsSearch}>
          <Form>
            <Input
              placeholder="Pizza, Sushi,..."
              onChange={handlleNameChange}
            />
          </Form>
          <p
            className={mealsText}
          >{`Showing ${curPage} of ${totalPages} pages`}</p>{" "}
          <MealsBtns
            onNextPage={nextPage}
            onPrevPage={prevPage}
            curPage={curPage}
            totalPages={totalPages}
          />
        </div>

        <Grid isAuto>
          {!isLoading ? (
            meals?.map((meal) => (
              <Meal
                name={meal.strMeal}
                category={meal.strCategory}
                photo={meal.strMealThumb}
                id={meal.idMeal}
                key={meal.idMeal}
              />
            ))
          ) : (
            <Loader isFull />
          )}
        </Grid>
      </Section>
    </>
  );
};

export default MealsName;
