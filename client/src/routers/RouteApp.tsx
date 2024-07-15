import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import { privateRoute, publicRoute } from "./define.ts";
import { IRoute } from "../interfaces/common-interface.ts";

import NotFound from "../pages/NotFound/index.tsx";
import MainLayout from "../layouts/MainLayout/index.tsx";
import ProtectRoute from "../pages/ProtectRoute/index.tsx";

function RouteApp() {
  const renderRouter = (routers: IRoute[]) => {
    return (
      routers &&
      !!routers.length &&
      routers.map((route) => {
        const Layout = route.layout || React.Fragment;
        const Comp = route.element;

        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Layout>
                <Comp />
              </Layout>
            }
          >
            {route.children && renderRouter(route.children)}
          </Route>
        );
      })
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* public route */}
        {renderRouter(publicRoute)}

        {/* private route */}
        <Route element={<ProtectRoute />}>{renderRouter(privateRoute)}</Route>

        {/* not found */}
        <Route
          path="*"
          element={
            <MainLayout>
              <NotFound />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteApp;
