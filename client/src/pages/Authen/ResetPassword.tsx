import React, { useState } from "react";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import "./Authen.scss";
import { RootState } from "../../redux/store.ts";
import { getQueryParams } from "../../utils/index.ts";
import { forgotPassword } from "../../services/auth-service.ts";
import { IParamsResetPassword } from "../../interfaces/auth-interface.ts";
import { TEXT_REQUIRED_INPUT } from "../../constants/validate-constants.ts";

import Input from "../../components/Input/index.tsx";
import Button from "../../components/Button/index.tsx";
import { sendBaseOTP } from "../../services/mailer-service.ts";

function ResetPassword() {
  const { search } = useLocation();
  const { token, email } = getQueryParams(search);

  const { loading } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loadingOTP, setLoadingOTP] = useState(false);

  const schemaForm = Yup.object().shape({
    password: Yup.string()
      .required(TEXT_REQUIRED_INPUT("new password"))
      .min(6, "Password must be at least 6 characters")
      .max(12, "Password must be maximum 12 characters"),
    otp: Yup.string().required(TEXT_REQUIRED_INPUT("OTP code")),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IParamsResetPassword>({
    defaultValues: {
      password: "",
      otp: "",
    },
    resolver: yupResolver(schemaForm),
  });

  const handleSendOTP = async () => {
    if (!email) return;
    setLoadingOTP(true);
    const resultOTP = await sendBaseOTP({ email });
    setLoadingOTP(false);
    if (resultOTP?.code === 200)
      return navigate(
        `/auth/reset-password?token=${resultOTP?.metadata?.data}&email=${email}`
      );
  };

  const handleSend = (values: IParamsResetPassword) => {
    if (!token || !email) return;
    const { password, otp } = values;
    const body = { password, otp, token, email };
    forgotPassword(body, navigate, dispatch);
  };

  return (
    <div className="wrapper-auth">
      <div className="auth-inner">
        <h2 className="auth-title-text">Đặt lại mật khẩu</h2>
        <div className="auth-form">
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                onlyBottom
                autoFocus
                type="password"
                label="Mật khẩu mới"
                value={value}
                onChange={onChange}
                placeholder="Nhập mật khẩu"
                message={errors.password?.message}
              />
            )}
          />
          <div style={{ display: "flex", gap: 12, width: "100%" }}>
            <Controller
              name="otp"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  maxLength={6}
                  status={errors.otp?.message && "error"}
                  label={`Nhập OTP`}
                  value={value}
                  onChange={onChange}
                  placeholder="Nhập mã OTP"
                />
              )}
            />
            <Button
              style={{ height: 40, marginTop: "auto" }}
              onClick={handleSendOTP}
              loading={loadingOTP}
            >
              Gửi lại mã
            </Button>
          </div>
        </div>
        <div className="auth-submits">
          <Button className="auth-submit" onClick={() => navigate(-1)}>
            Trở về
          </Button>
          <Button
            primary
            loading={loading}
            className="auth-submit"
            onClick={handleSubmit(handleSend)}
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
