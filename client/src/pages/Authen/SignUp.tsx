import React from "react";
import dayjs from "dayjs";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import "./Authen.scss";
import { RootState } from "../../redux/store.ts";
import { signUp } from "../../services/auth-service.ts";
import { GENDER } from "../../constants/common-constants.ts";
import { REGEX_EMAIL } from "../../constants/validate-constants.ts";
import { IParamsRegister } from "../../interfaces/auth-interface.ts";

import Input from "../../components/Input/index.tsx";
import Button from "../../components/Button/index.tsx";
import Select from "../../components/Select/index.tsx";
import DatePicker from "../../components/DatePicker/index.tsx";

function SignUp() {
  const { loading } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schemaForm = Yup.object().shape({
    email: Yup.string().required().matches(REGEX_EMAIL, ""),
    password: Yup.string().required().min(6).max(12),
    firstName: Yup.string().required().max(15),
    lastName: Yup.string().required().max(20),
    gender: Yup.number().required(),
    dateOfBirth: Yup.date().required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IParamsRegister>({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      gender: undefined,
      dateOfBirth: new Date(),
    },
    resolver: yupResolver(schemaForm),
  });

  const handleSignUp = (values: IParamsRegister) => {
    signUp(values, navigate, dispatch);
  };

  return (
    <div className="wrapper-auth">
      <div className="auth-inner">
        <h2 className="auth-title-text">Đăng kí</h2>
        <div className="auth-form">
          <div style={{ display: "flex", gap: 16 }}>
            <Controller
              name="firstName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  status={errors?.firstName?.message && "error"}
                  maxLength={15}
                  label="Họ"
                  value={value}
                  onChange={onChange}
                  placeholder="Nhập họ"
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  status={errors?.lastName?.message && "error"}
                  label="Tên"
                  maxLength={20}
                  value={value}
                  onChange={onChange}
                  placeholder="Nhập tên"
                />
              )}
            />
          </div>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                status={errors?.email?.message && "error"}
                label="Email"
                value={value}
                onChange={onChange}
                placeholder="Nhập email"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                status={errors?.password?.message && "error"}
                label="Mật khẩu"
                count={{ show: true, max: 12 }}
                maxLength={12}
                minLength={6}
                value={value}
                onChange={onChange}
                placeholder="Nhập mật khẩu"
                type="password"
                message={errors.password?.message}
              />
            )}
          />
          <Controller
            name="gender"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                value={value}
                status={errors?.gender?.message && "error"}
                options={GENDER}
                label="Giới tính"
                onChange={onChange}
                placeholder="Chọn giới tính"
              />
            )}
          />
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                status={errors?.dateOfBirth?.message && "error"}
                value={dayjs(new Date(value))}
                label="Ngày sinh"
                placeholder="Ngày sinh của bạn"
                onChange={onChange}
              />
            )}
          />
        </div>
        <NavLink to="/auth/forgot-password" className="auth-forgot">
          Quên mật khẩu?
        </NavLink>
        <div className="auth-submits">
          <Button
            className="auth-submit"
            onClick={() => navigate("/auth/sign-in")}
          >
            Đăng nhập
          </Button>
          <Button
            primary
            loading={loading}
            disabled={loading}
            className="auth-submit"
            onClick={handleSubmit(handleSignUp)}
          >
            Đăng kí
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
