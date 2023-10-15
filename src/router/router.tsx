import React, { Suspense, Fragment, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import LoadingScreen from "../components/Loading/Loading";

const RenderRoutes = () => (
  <Suspense fallback={<LoadingScreen />}>
    <Routes>
      {routes.map((route: any, i: number) => {
        const Guard = route?.guard ? route.guard : Fragment;
        const Layout = route.layout ? route.layout : Fragment;
        const Component = route.component ? route.component : Fragment;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>
                  <Component />
                </Layout>
              </Guard>
            }
          >
            {route.routes?.length > 0 &&
              route.routes.map((subRoute: any, j: number) => {
                const Component = subRoute.component;
                return (
                  <Route path={subRoute.path} element={<Component />} key={j} />
                );
              })}
          </Route>
        );
      })}
    </Routes>
  </Suspense>
);

export default RenderRoutes;

export const routes = [
  {
    path: "/",
    component: lazy(() => import("../views/Home")),
  },
];
