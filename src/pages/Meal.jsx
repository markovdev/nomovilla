import React, { useEffect, useState } from "react";
import { MdAdd, MdMinimize, MdOutlineBookmarkAdd } from "react-icons/md";
import useHttp from "../hooks/http";
import { useParams } from "react-router";
import {
  meal,
  photoBox,
  headingBox,
  heading,
  mealPhoto,
  ingredientsBox,
  mealInstructions,
  instructionsHeading,
  mealbtn,
} from "./Meal.module.css";
import Section from "../components/Utils/Section";
import Message from "../components/UI/Message";
import Loader from "../components/UI/Loader";
import axios from "axios";
import { auth } from "../firebase";
import useAuthContext from "../hooks/useAuthContext";
import { v4 as uuid } from "uuid";
import { FB_APP_URL } from "../config/config";
const Meal = () => {
  const [message, setMessage] = useState({
    message: null,
    status: "success",
  });
  const { sendRequest, data, error, isLoading } = useHttp();
  const { user } = useAuthContext();
  const handleBookmark = async (name, photo, category) => {
    try {
      const res = await axios.post(
        `${FB_APP_URL}/bookmarks.json?auth=${user.token}`,
        {
          id,
          name,
          photo,
          category,
          user: auth.currentUser.uid,
        }
      );
      setMessage({
        message: `${name} Added to your bookings!`,
      });
    } catch (err) {
      setMessage({ message: err.response.data.error, status: "fail" });
    }
  };
  const { id } = useParams();
  useEffect(() => {
    sendRequest(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  }, []);
  return (
    <>
      {message && (
        <Message
          message={message.message}
          status={message.status}
          key={uuid()}
        />
      )}
      {error && <Message message={error} status="fail" key={uuid()} />}

      {!isLoading ? (
        <Section isReset>
          <div className={meal}>
            <div className={photoBox}>
              <div className={headingBox}>
                <h4 className={heading}>{data?.data.meals[0]?.strMeal}</h4>
              </div>
              <img
                src={data?.data.meals[0]?.strMealThumb}
                alt={`${data?.data.meals[0]?.strMeal} meal on Nomovilla`}
                className={mealPhoto}
              />
            </div>
            <div className="meal__actions">
              <button
                className={mealbtn}
                onClick={() =>
                  handleBookmark(
                    data?.data.meals[0]?.strMeal,
                    data?.data.meals[0]?.strMealThumb,
                    data?.data.meals[0]?.strCategory
                  )
                }
              >
                <MdOutlineBookmarkAdd />
              </button>
            </div>
            <div className={ingredientsBox}>
              <h3 className={instructionsHeading}>
                {`${data?.data.meals[0]?.strMeal} Ingredients`}{" "}
              </h3>
            </div>
            <p className={mealInstructions}>
              {data?.data.meals[0]?.strInstructions}
            </p>
          </div>
        </Section>
      ) : (
        <Loader isFull />
      )}
    </>
  );
};

export default Meal;
