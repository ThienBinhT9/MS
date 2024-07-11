import React from "react";

import Header from "../components/Header/index.tsx";
import Navigation from "../components/Navigation/index.tsx";

import "./MainLayout.scss";

function MainLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="full-layout-content">
        <Navigation />
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
