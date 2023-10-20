import React, { useEffect } from "react";
import Layout from "../hoc/Layout/Layout";
import useHttp from "../hooks/http";
import { auth } from "../firebase";
import Section from "../components/Utils/Section";
import useAuthContext from "../hooks/useAuthContext";
import Bookmark from "../components/Bookmark/Bookmark";
import { bookmarks } from "./Bookmarks.module.css";
import { FB_APP_URL } from "../config/config";
import Loader from "../components/UI/Loader";
import Heading from "../components/common/Heading/Heading";
import Message from "../components/UI/Message";

const Bookmarks = () => {
  const { sendRequest: getBookmarks, data, error, isLoading } = useHttp();
  const {
    sendRequest: deleteBookmark,
    data: deletedBookmarks,
    error: deleteBookmarkErr,
    isLoading: deleteBookmarkLoader,
  } = useHttp();
  const { user } = useAuthContext();
  const handleDeleteBookmark = (id) => {
    deleteBookmark(
      `${FB_APP_URL}/bookmarks/${id}.json?auth=${user.token}`,
      "DELETE"
    );
  };
  const fetchBookmarks = (userID) => {
    if (user && !deleteBookmarkLoader) {
      getBookmarks(
        `${FB_APP_URL}/bookmarks.json?auth=${user.token}&orderBy="user"&startAt="${userID}"`,
        "GET"
      );
    }
  };
  useEffect(() => {
    fetchBookmarks(user?.id);
  }, [user, deletedBookmarks]);

  return (
    <>
      {error && <Message message={error?.response.data.error} status="fail" />}
      <Section className={bookmarks}>
        {!isLoading && data ? (
          Object.keys(data.data).map((key) => (
            <Bookmark
              key={key}
              name={data.data[key].name}
              photo={data.data[key].photo}
              handleDelete={() => handleDeleteBookmark(key)}
              id={key}
            />
          ))
        ) : (
          <Loader isFull />
        )}
        {!isLoading && data?.data && Object.keys(data?.data).length === 0 ? (
          <Heading text="There is no bookmarks at the moment. 😢" isSecond />
        ) : null}
      </Section>
    </>
  );
};

export default Bookmarks;
