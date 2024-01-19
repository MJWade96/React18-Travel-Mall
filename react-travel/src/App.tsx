import React from 'react';
import styles from "./App.module.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { HomePage, SignInPage, RegisterPage, DetailPage, ShoppingCartPage } from "./pages";

function PrivateRoute({ children, isAuthenticated }) {
  return isAuthenticated ? <>{children}</> : <Navigate to="/signIn" />;
}
/*
const PrivateRoute = ({ component, isAuthenticated, ...rest }) => {
  const RouteComponent = (props) => {
    return isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Navigate to={{ pathname: "/signIn" }} />
    ); 
  }
  return <Route element={<RouteComponent />} {...rest} />;
}*/


function App() {
  const jwt = useSelector((s) => s.user.token);
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/shoppingCart"
            element={
              <PrivateRoute isAuthenticated={jwt !== null}>
                <ShoppingCartPage />
              </PrivateRoute>
            }
          />
          <Route path="/detail/:touristRouteId" element={<DetailPage />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
