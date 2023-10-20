import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import useLocalStorage from "../useLocalStorage";
import useAuthContext from "../useAuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import useFirebaseError from "../useFirebaseError";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleFirebaseErr, error } = useFirebaseError();
  const { dispatch, user: curAuthUser } = useAuthContext();
  const [user, setUser] = useLocalStorage("user");
  const navigate = useNavigate();

  const loginHandler = async (email, password) => {
    try {
      setIsLoading(true);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const userObj = {
        name: user.displayName,
        email: user.email,
        isVerified: user.isVerified,
        token: user.accessToken,
        id: user.uid,
        expiresIn: auth.currentUser.stsTokenManager.expirationTime,
      };
      setUser(userObj);

      dispatch({
        type: "LOGIN",
        user: userObj,
      });
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      handleFirebaseErr(err);
      setIsLoading(false);
    }
  };
  return { loginHandler, error, isLoading };
};

export default useLogin;
