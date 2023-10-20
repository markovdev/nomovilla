import { useCallback, useReducer } from "react";
import axios from "axios";
const initialState = {
  loading: null,
  error: null,
  data: null,
  extra: null,
  identifier: null,
};
const httpReducer = (state, action) => {
  switch (action.type) {
    case "SEND":
      return {
        loading: true,
        error: null,
        data: null,
        extra: null,
        identifier: action.identifier,
      };
    case "RESPONSE":
      return {
        ...state,
        loading: false,
        data: action.resData,
        extra: action.extra,
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
const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);
  const clear = useCallback(() => dispatchHttp({ type: "CLEAR" }), []);
  const sendRequest = useCallback(
    async (url, method, body, requestExtra, requestId) => {
      try {
        dispatchHttp({ type: "SEND", identifier: requestId });
        const resData = await axios(url, {
          method,
          body,
        });
        dispatchHttp({
          type: "RESPONSE",
          resData: resData,
        });
      } catch (error) {
        dispatchHttp({
          type: "ERROR",
          error,
        });
      }
    },
    []
  );
  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    requestExtra: httpState.requestExtra,
    requestId: httpState.requestId,
    sendRequest,
    clear,
  };
};
export default useHttp;
