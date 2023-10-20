import React from "react";

import { useEffect } from "react";
import useHttp from "../../hooks/http";
import Meal from "../Meal/Meal";
import Section from "../Utils/Section";
import Grid from "../../hoc/Layout/Grid";
import Loader from "../../components/UI/Loader";
const Meals = () => {
  const { sendRequest, data, error, isLoading } = useHttp();
  useEffect(() => {
    sendRequest("https://www.themealdb.com/api/json/v1/1/search.php?f=c");
  }, []);
  return (
    <Section>
      {" "}
      {!isLoading ? (
        <Grid isAuto>
          {data?.data.meals.slice(0, 3).map((meal) => (
            <Meal
              name={meal.strMeal}
              photo={meal.strMealThumb}
              tags={meal.strTags}
              category={meal.strCategory}
              key={meal.idMeal}
              id={meal.idMeal}
            />
          ))}{" "}
        </Grid>
      ) : (
        <Loader isFull />
      )}
    </Section>
  );
};
export default Meals;
