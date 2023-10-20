import React from "react";
import {
  bookmark,
  bookmarkPhoto,
  bookmarkText,
  bookmarkBtn,
  photoBox,
} from "./Bookmark.module.css";
import Button from "../Utils/Button";
import { MdBookmarkRemove } from "react-icons/md";
const Bookmark = ({ name, photo, handleDelete }) => {
  return (
    <div className={bookmark}>
      <div className={photoBox}>
        {" "}
        <img className={bookmarkPhoto} src={photo} alt={`${name} meal photo`} />
      </div>
      <div className={bookmarkText}>
        {" "}
        <h3 className="heading--tertiary">{name}</h3>
      </div>

      <Button className={bookmarkBtn} isReset onClick={handleDelete}>
        <MdBookmarkRemove />
      </Button>
    </div>
  );
};

export default Bookmark;
