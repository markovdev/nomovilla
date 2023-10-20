import React, { useEffect, useState } from "react";
import Section from "../Utils/Section";
import Form from "../UI/Form";
import Input from "../UI/Input";
import Button from "../Utils/Button";
import { auth } from "../../firebase";
import { updateProfile } from "firebase/auth";
import useAuthContext from "../../hooks/useAuthContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import useFirebaseError from "../../hooks/useFirebaseError";
import useAsync from "../../hooks/useAsync";
import Message from "../UI/Message";
const ChangeUserInfo = () => {
  const [user, setUser] = useLocalStorage("user");
  const currentAuthUser = auth.currentUser;
  const { dispatch } = useAuthContext();
  const { handleFirebaseErr, error } = useFirebaseError();

  const {
    dispatch: dispatchAsync,
    message,
    isLoading,
    error: asyncError,
  } = useAsync();

  const [userData, setUserData] = useState({
    name: null,
    email: null,
  });
  const changeName = async (e) => {
    try {
      e.preventDefault();

      const res = await updateProfile(auth.currentUser, {
        displayName: userData.name,
      });
      const userObj = {
        name: currentAuthUser.displayName,
        email: currentAuthUser.email,
        id: currentAuthUser.uid,
      };

      dispatchAsync({
        type: "SEND",
      });
      dispatch({
        type: "UPDATE",
        user: userObj,
      });
      dispatchAsync({
        type: "RESPONSE",
        message: "Name updated successfully!",
      });
      setUser(userObj);
    } catch (err) {
      dispatch({
        type: "ERROR",
      });
      handleFirebaseErr(err);
    }
  };

  const hanldeUserData = (e) => {
    const { name, value, id } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <Section isBorder>
      {message ? <Message message={message} /> : null}
      <Form onSubmit={changeName} isFlex={false} isCol>
        <Input
          label="Name"
          placeholder={!user.name ? "Set your name here" : "John Doe"}
          val={user.name}
          onChange={hanldeUserData}
          name="name"
        />{" "}
        <Input
          label="Email"
          placeholder="user@nomovilla.com"
          name="email"
          val={user.email}
          onChange={hanldeUserData}
          disabled
        />
        <Button text="Update" isLoading={isLoading} />
      </Form>{" "}
    </Section>
  );
};

export default ChangeUserInfo;
