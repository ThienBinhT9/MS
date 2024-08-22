import React, { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import "./Authen.scss";
import { RootState } from "../../redux/store.ts";
import { identify } from "../../services/user-service.ts";
import { sendBaseOTP } from "../../services/mailer-service.ts";
import { IParamsForgotPassword } from "../../interfaces/auth-interface.ts";
import {
  REGEX_EMAIL,
  TEXT_EMAIL_FORMAT,
  TEXT_REQUIRED_INPUT,
} from "../../constants/validate-constants.ts";

import Input from "../../components/Input/index.tsx";
import Button from "../../components/Button/index.tsx";

function Identify() {
  const { loading } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loadingOTP, setLoadingOTP] = useState(false);

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

  const handleSend = async (values: IParamsForgotPassword) => {
    const result = await identify(values, dispatch);
    if (result?.code === 200) {
      setLoadingOTP(true);
      const resultOTP = await sendBaseOTP(values);
      setLoadingOTP(false);
      return navigate(
        `/auth/reset-password?token=${resultOTP?.metadata?.data}&email=${values.email}`
      );
    }
  };

  return (
    <div className="wrapper-auth">
      <div className="auth-inner">
        <h2 className="auth-title-text">Tìm tài khoản</h2>
        <div className="auth-form">
          <p>Vui lòng nhập email để tìm kiếm tài khoản của bạn.</p>
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
                placeholder="Nhập email của bạn"
                message={errors.email?.message}
              />
            )}
          />
        </div>
        <div className="auth-submits">
          <Button className="auth-submit" onClick={() => navigate(-1)}>
            Trở về
          </Button>
          <Button
            primary
            loading={loading || loadingOTP}
            className="auth-submit"
            onClick={handleSubmit(handleSend)}
          >
            Tiếp tục
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Identify;
