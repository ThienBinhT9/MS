import React from "react";

import Header from "../components/Header/index.tsx";

import "./MainLayout.scss";

function MainLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="main-layout-content">{children}</div>
    </div>
  );
}

export default MainLayout;
