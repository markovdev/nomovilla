import { FirebaseError } from "firebase/app";
import React, { useReducer } from "react";
const initialState = {
  loading: null,
  error: null,
  data: null,
  extra: null,
  identifier: null,
  message: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SEND":
      return {
        loading: true,
        error: null,
        data: null,
      };
    case "RESPONSE":
      return {
        ...state,
        loading: false,
        data: action.resData,
        message: action.message,
      };
    case "ERROR":
      return {
        error: action.error,
        loading: false,
      };
    case "CLEAR":
      return initialState;
    default:
      console.log("[-] Should not get here...");
  }
};
const useAsync = () => {
  const [res, dispatch] = useReducer(reducer, initialState);

  return {
    dispatch,
    error: res.error,
    isLoading: res.loading,
    message: res.message,
  };
};

export default useAsync;
