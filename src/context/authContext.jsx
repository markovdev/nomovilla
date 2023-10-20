import { createContext, useEffect, useReducer } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
export const AuthContext = createContext();
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.user,
      };
    case "SIGNUP":
      return {
        user: action.user,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    case "DELETE":
      return {
        user: null,
      };
    case "UPDATE":
      return {
        user: action.user,
      };
    default:
      return state;
  }
};
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user");
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  useEffect(() => {
    if (user.token) {
      dispatch({ type: "LOGIN", user });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
