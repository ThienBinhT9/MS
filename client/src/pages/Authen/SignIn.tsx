import React from "react";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import "./Authen.scss";
import { RootState } from "../../redux/store.ts";
import { signIn } from "../../services/auth-service.ts";
import { IParamsLogin } from "../../interfaces/auth-interface.ts";
import {
  TEXT_MAX,
  REGEX_EMAIL,
  TEXT_EMAIL_FORMAT,
  TEXT_REQUIRED_INPUT,
} from "../../constants/validate-constants.ts";

import Input from "../../components/Input/index.tsx";
import Button from "../../components/Button/index.tsx";

function SignIn() {
  const { loading } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schemaForm = Yup.object().shape({
    email: Yup.string()
      .required(TEXT_REQUIRED_INPUT("email"))
      .matches(REGEX_EMAIL, TEXT_EMAIL_FORMAT),
    password: Yup.string()
      .required(TEXT_REQUIRED_INPUT("password"))
      .max(12, TEXT_MAX(12)),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IParamsLogin>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schemaForm),
  });

  const handleSignIn = (values: IParamsLogin) => {
    signIn(values, navigate, dispatch);
  };

  return (
    <div className="wrapper-auth">
      <div className="auth-inner">
        <h2 className="auth-title-text">Sign In</h2>
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
        </div>
        <NavLink to="/auth/forgot-password" className="auth-forgot">
          Forgot password?
        </NavLink>
        <div className="auth-submits">
          <Button
            className="auth-submit"
            onClick={() => navigate("/auth/sign-up")}
          >
            Sign Up
          </Button>
          <Button
            primary
            disabled={loading}
            loading={loading}
            className="auth-submit"
            onClick={handleSubmit(handleSignIn)}
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
