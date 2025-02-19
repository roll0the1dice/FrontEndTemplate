import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import LoginAndRegister from "../pages/LoginAndRegister";
import NoAuth from "../pages/NoAuth";
import withAuth from "../components/WithAuth";
import DetailWithAuth from "../pages/Detail";

const routesConfig = [
  {
    path: "/",
    element: <Home />,
    exact: true,
  },
  {    
    path: "/login",
    element: <LoginAndRegister />,
    exact: true,
  },
  {
    path: "/detail/:id",
    element: <DetailWithAuth />,
    exact: true,
  },
  {
    path: "/noauth",
    element: <NoAuth />,
    exact: true,
  }
];

const AppRoutes = () => {
  const generateRoutes = (routes: any) => {
    return routes.map((route: any) => (
      <Route key={route.path} path={route.path} element={route.element} >
        {route.children && generateRoutes(route.children)}{" "}
        {/* 递归处理子路由 */}
      </Route>
    ));
  };

  return <Routes>{generateRoutes(routesConfig)}</Routes>;
};

export default AppRoutes;
