import React from "react";
import ReactDOM from "react-dom/client";
import "./themes/index.scss";

import Providers from "./provider/index.tsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Providers />);
