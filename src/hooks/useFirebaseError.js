import { FirebaseError } from "firebase/app";
import React, { useState, useEffect } from "react";

const useFirebaseError = () => {
  const [error, setErr] = useState(null);

  const handleFirebaseErr = (err) => {
    if (err instanceof FirebaseError) {
      switch (err.code) {
        case "auth/missing-email":
          setErr("There is no user with this email!");
          break;

        case "auth/invalid-login-credentials":
          // Setting this message for better security practice
          setErr("Incorrect email or password");
          break;
        case "auth/email-already-in-use":
          setErr("There is already user with this email!");
          break;
        case "auth/too-many-requests":
          setErr("Too many requests!, try again later. ");
          break;
        case "auth/missing-password":
          setErr("Please provide your password!");
          break;
        case "auth/weak-password":
          setErr("Password should be at least 6 characters or more!");
          break;
        default:
          setErr("Somthing went very wrong!, Please try again later. ");
      }
    }
  };

  return {
    handleFirebaseErr,
    error,
  };
};

export default useFirebaseError;
