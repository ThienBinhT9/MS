import React from "react";
import { useNavigate } from "react-router-dom";

import "./NotFound.scss";
import img_notfound from "../../assets/images/not-found.jpg";

import Button from "../../components/Button/index.tsx";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="wrapper-notfound">
      <h2 className="notfound-title">Oops! page not found</h2>
      <h3 className="notfound-description">
        Your page is currently under maintenance add will guide you back to the
        home page.
      </h3>
      <div className="notfound-img">
        <img src={img_notfound} alt="img" />
      </div>
      <Button primary onClick={() => navigate(-1)}>
        Go back
      </Button>
    </div>
  );
}

export default NotFound;
