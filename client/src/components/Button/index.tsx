import React from "react";
import { ButtonProps, Button } from "antd";

import "./Button.scss";
import { NavLink } from "react-router-dom";

interface Props extends ButtonProps {
  to?: string;
  className?: string;
  primary?: boolean;
  danger?: boolean;
  text?: boolean;
  disable?: boolean;
}

function ButtonCustom(props: Props) {
  const {
    to,
    children,
    className,
    primary,
    text,
    danger,
    disabled,
    ...passProps
  } = props;
  return to ? (
    <NavLink to={to}>
      <Button
        className={`wrapper-button ${primary && "primary"} ${text && "text"} ${
          danger && "danger"
        } ${disabled && "disabled"} ${className}`}
        disabled={disabled}
        {...passProps}
      >
        {children}
      </Button>
    </NavLink>
  ) : (
    <Button
      className={`wrapper-button ${primary && "primary"} ${text && "text"} ${
        danger && "danger"
      } ${disabled && "disabled"} ${className}`}
      {...passProps}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}

export default ButtonCustom;
