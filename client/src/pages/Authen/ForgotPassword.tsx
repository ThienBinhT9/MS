import React from "react";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import "./Authen.scss";
import { IParamsForgotPassword } from "../../interfaces/auth-interface.ts";
import {
  REGEX_EMAIL,
  TEXT_EMAIL_FORMAT,
  TEXT_REQUIRED_INPUT,
} from "../../constants/validate-constants.ts";

import Input from "../../components/Input/index.tsx";
import Button from "../../components/Button/index.tsx";

function ForgotPassword() {
  const navigate = useNavigate();

  const schemaForm = Yup.object().shape({
    email: Yup.string()
      .required(TEXT_REQUIRED_INPUT("email"))
      .matches(REGEX_EMAIL, TEXT_EMAIL_FORMAT),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IParamsForgotPassword>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schemaForm),
  });

  const handleSend = (values: IParamsForgotPassword) => {
    const { email } = values;
    console.log({ email });
  };

  return (
    <div className="wrapper-auth">
      <div className="auth-inner">
        <h2 className="auth-title-text">Forgot Password</h2>
        <div className="auth-form">
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                onlyBottom
                autoFocus
                label="Your email"
                value={value}
                onChange={onChange}
                placeholder="Enter your email"
                message={errors.email?.message}
              />
            )}
          />
        </div>
        <div className="auth-submits">
          <Button className="auth-submit" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button
            primary
            className="auth-submit"
            onClick={handleSubmit(handleSend)}
          >
            Send Email
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
