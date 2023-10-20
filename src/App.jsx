import { BrowserRouter, Route, Routes } from "react-router-dom";
import Meal from "./pages/Meal";
import Home from "./pages/Home";
import Meals from "./pages/Meals";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GlobalErrorBoundary from "./hoc/GlobalErrorBoundary";
import { AuthContextProvider } from "./context/authContext";
import Me from "./pages/Me";
import ForgotPassword from "./pages/ForgotPassword";
import Bookmarks from "./pages/Bookmarks";
import Layout from "./hoc/Layout/Layout";
import { useEffect, useState } from "react";
import ProtectedRoutes from "./hoc/ProtectedRoutes";
import AuthContainer from "./hoc/AuthContainer";
import "./App.css";
import "./styles/Variables.module.css";
import "./styles/Typography.module.css";
import NotFound from "./pages/NotFOund";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const handleLoading = () => {
      setIsLoading(false);
    };
    window.addEventListener("load", handleLoading);
    return () => {
      window.removeEventListener("load", handleLoading);
    };
  }, []);
  return (
    <GlobalErrorBoundary>
      <AuthContextProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/signup" exact element={<Signup />} />
              <Route
                path="/forgot-password"
                exact
                element={<ForgotPassword />}
              />
              <Route path="/meals" exact element={<Meals />} />
              <Route path="/meal/:id" exact element={<Meal />} />

              {/* Protected Routes */}
              <Route
                element={
                  <ProtectedRoutes isLoading={isLoading}>
                    <AuthContainer />
                  </ProtectedRoutes>
                }
              >
                <Route path="/me" exact element={<Me />} />
                <Route path="/bookmarks" exact element={<Bookmarks />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthContextProvider>
    </GlobalErrorBoundary>
  );
}

export default App;
