import React from "react";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import "./Authen.scss";
import { IParamsRegister } from "../../interfaces/auth-interface.ts";
import {
  TEXT_MAX,
  REGEX_EMAIL,
  TEXT_EMAIL_FORMAT,
  TEXT_REQUIRED_INPUT,
} from "../../constants/validate-constants.ts";

import Input from "../../components/Input/index.tsx";
import Button from "../../components/Button/index.tsx";

function SignUp() {
  const navigate = useNavigate();

  const schemaForm = Yup.object().shape({
    email: Yup.string()
      .required(TEXT_REQUIRED_INPUT("email"))
      .matches(REGEX_EMAIL, TEXT_EMAIL_FORMAT),
    password: Yup.string()
      .required(TEXT_REQUIRED_INPUT("password"))
      .max(12, TEXT_MAX(12)),
    confirmPassword: Yup.string()
      .required(TEXT_REQUIRED_INPUT("confirm password"))
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IParamsRegister>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schemaForm),
  });

  const handleSignUp = (values: IParamsRegister) => {
    const { email, password, confirmPassword } = values;
    console.log({ email, password, confirmPassword });
  };

  return (
    <div className="wrapper-auth">
      <div className="auth-inner">
        <h2 className="auth-title-text">Sign Up</h2>
        <div className="auth-form">
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                onlyBottom
                autoFocus
                label="Email"
                value={value}
                onChange={onChange}
                placeholder="Enter email"
                message={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Password"
                onlyBottom
                value={value}
                onChange={onChange}
                placeholder="Enter password"
                message={errors.password?.message}
                type="password"
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Confirm Password"
                onlyBottom
                value={value}
                onChange={onChange}
                placeholder="Enter password"
                message={errors.confirmPassword?.message}
                type="password"
              />
            )}
          />
        </div>
        <NavLink to="/auth/forgot-password" className="auth-forgot">
          Forgot password?
        </NavLink>
        <div className="auth-submits">
          <Button
            className="auth-submit"
            onClick={() => navigate("/auth/sign-in")}
          >
            Sign In
          </Button>
          <Button
            primary
            className="auth-submit"
            onClick={handleSubmit(handleSignUp)}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
