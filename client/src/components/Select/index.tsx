import React from "react";
import { SelectProps, Select } from "antd";

import "./Select.scss";
interface Props extends SelectProps {
  label?: string;
  message?: string;
  require?: boolean;
}

function SelectCustom(props: Props) {
  const { label, message, require, ...passProps } = props;

  return (
    <div className="wrapper-form">
      {label && (
        <label className="form-label">
          {label}
          {require && <span style={{ color: "red" }}>*</span>}
        </label>
      )}
      <Select className={`form-select`} {...passProps} />
      {message && <span className="form-error">{message}</span>}
    </div>
  );
}

export default SelectCustom;
