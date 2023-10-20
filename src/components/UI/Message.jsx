import React, { useEffect, useState } from "react";
import {
  messages,
  messageClass,
  messageText,
  messageError,
} from "./Message.module.css";
const Message = ({ message, status = "success" }) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, [message]);
  return (
    <>
      {show && (
        <div className={messages}>
          <p
            className={`${messageClass}  ${
              status === "fail" ? messageError : ""
            }`}
          >
            {message}
          </p>
        </div>
      )}
    </>
  );
};

export default Message;
