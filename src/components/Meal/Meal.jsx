import React, { useState } from "react";
import axios from "axios";
import {
  meal,
  mealBox,
  mealImg,
  mealText,
  mealHeading,
  mealCategory,
  mealCategoryVegan,
  mealTags,
  mealActions,
  mealLink,
} from "./Meal.module.css";

import { Link } from "react-router-dom";
import { MdBookmarkAdd } from "react-icons/md";

import { auth } from "../../firebase";
import Message from "../../components/UI/Message";
import Button from "../Utils/Button";
import useHttp from "../../hooks/http";
import useAuthContext from "../../hooks/useAuthContext";
import { FB_APP_URL } from "../../config/config";
const Meal = ({ name, category, photo, tags, id }) => {
  const { sendRequest, error, isLoading, data } = useHttp();
  const { user } = useAuthContext();
  const [message, setMessage] = useState({
    message: null,
    status: "success",
  });
  const handleBookmark = async (e) => {
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

  return (
    <>
      {message.message && (
        <Message message={message.message} status={message.status} />
      )}
      <div className={meal}>
        <img src={photo} alt="meal img" className={mealImg} />

        <div className={mealText}>
          <h3 className={mealHeading}>{name}</h3>
          <p className={mealCategory}>{category} </p>

          <div className={mealActions}>
            {user ? (
              <Button class="btn--priamry" onClick={handleBookmark}>
                <MdBookmarkAdd className="icon" />
              </Button>
            ) : null}

            <Link className={mealLink} to={`/meal/${id}`}>
              View
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Meal;
