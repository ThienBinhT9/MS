import React from "react";
import { ButtonProps, Button } from "antd";

import "./Button.scss";
import { NavLink } from "react-router-dom";

interface Props extends ButtonProps {
  to?: string;
  className?: string;
  primary?: boolean;
  text?: boolean;
}

function ButtonCustom(props: Props) {
  const { to, children, className, primary, text, ...passProps } = props;
  return to ? (
    <NavLink to={to} style={{ display: "block" }}>
      <Button
        className={`wrapper-button ${className} ${primary && "primary"} ${
          text && "text"
        }`}
        {...passProps}
      >
        {children}
      </Button>
    </NavLink>
  ) : (
    <Button
      className={`wrapper-button ${className} ${primary && "primary"} ${
        text && "text"
      }`}
      {...passProps}
    >
      {children}
    </Button>
  );
}

export default ButtonCustom;
