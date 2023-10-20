import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import React from "react";
import { auth } from "../../firebase";
import { useState } from "react";
import { useNavigate } from "react-router";
import useFirebaseError from "../useFirebaseError";
import useLocalStorage from "../useLocalStorage";
import useAsync from "../useAsync";
import useAuthContext from "../useAuthContext";

const useSignup = () => {
  const { dispatch, error: asyncError, isLoading } = useAsync();
  const { dispatch: disptachUser } = useAuthContext();
  const [user, setUser] = useLocalStorage("user");
  const navigate = useNavigate();
  const { handleFirebaseErr, error } = useFirebaseError();

  const signup = async (email, password) => {
    try {
      dispatch({
        type: "SEND",
      });
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      sendEmailVerification(user);
      const userObj = {
        name: user.displayName,
        email: user.email,
        isVerified: user.isVerified,
        id: user.uid,
        expiresIn: auth.currentUser.stsTokenManager.expirationTime,
      };
      setUser(userObj);
      disptachUser({
        type: "SIGNUP",
        user: userObj,
      });
      navigate("/");
    } catch (err) {
      dispatch({ type: "ERROR" });
      handleFirebaseErr(err);
    }
  };
  return { signup, isLoading, error };
};

export default useSignup;
