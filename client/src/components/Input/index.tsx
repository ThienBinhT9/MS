import React from "react";
import { InputProps, Input } from "antd";

import "./Input.scss";

interface Props extends InputProps {
  label?: string;
  onlyBottom?: boolean;
  message?: string;
}

function InputCustom(props: Props) {
  const { label, onlyBottom, message, ...passProps } = props;
  return (
    <div className="wrapper-form">
      {label && <label className="form-label">{label}</label>}
      <Input
        className={`form-imput ${onlyBottom && "onlyBottom"}`}
        {...passProps}
      />
      {message && <span className="form-error">{message}</span>}
    </div>
  );
}

export default InputCustom;
