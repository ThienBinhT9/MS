import React from "react";
import { DatePicker, DatePickerProps } from "antd";

import "./DatePicker.scss";

interface Props extends DatePickerProps {
  label?: string;
  message?: string;
  require?: boolean;
}

function DatePickerCustom(props: Props) {
  const { label, message, require, ...passProps } = props;
  return (
    <div className="wrapper-form">
      {label && (
        <label className="form-label">
          {label}
          {require && <span style={{ color: "red" }}>*</span>}
        </label>
      )}
      <DatePicker className={`form-datepicker`} {...passProps} />
      {message && <span className="form-error">{message}</span>}
    </div>
  );
}

export default DatePickerCustom;
