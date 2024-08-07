import React, { useEffect, useState } from "react";
import { Input, GetProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Verify.scss";
import logo from "../../assets/images/logo.png";
import { RootState } from "../../redux/store.ts";
import { signOut } from "../../services/auth-service.ts";
import { updateUser } from "../../services/user-service.ts";
import { createAxios } from "../../configs/token.config.ts";
import { sendOTP, verifyOTP } from "../../services/mailer-service.ts";

import Button from "../../components/Button/index.tsx";
import ThreeDotLoader from "../../components/Loading/ThreeDot.tsx";
import SectionWrapper from "../../components/SectionWrapper/index.tsx";

type OTPProps = GetProps<typeof Input.OTP>;

function Verify() {
  const { token } = useSelector((state: RootState) => state.auth);
  const { currentUser, loading } = useSelector(
    (state: RootState) => state.user
  );

  const [messageVerify, setMessageVerify] = useState("");
  const [loadingSend, setLoadingSend] = useState(false);
  const [tokenOTP, setTokenOTP] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const axiosInstance = createAxios(token, dispatch);

  const onChange: OTPProps["onChange"] = async (text) => {
    const data = { token: tokenOTP, otp: text };
    const data2 = { isVerified: true };
    const result = await verifyOTP(axiosInstance, data, token);
    if (result?.code === 200)
      await updateUser(axiosInstance, data2, token, dispatch, navigate);
    else setMessageVerify(result.message);
  };

  const handleSignOut = () => {
    signOut(axiosInstance, token, navigate, dispatch);
  };

  const handleSendOTP = async () => {
    setLoadingSend(true);
    const data = { email: currentUser?.email };
    const result = await sendOTP(axiosInstance, data, token);
    setLoadingSend(false);
    if (result?.code === 200) setTokenOTP(result.metadata.data);
  };

  useEffect(() => {
    handleSendOTP();
  }, []);

  return (
    <div className="wrapper-verify">
      <div className="verify-header">
        <div className="verify-header-inner">
          <div className="verify-header-logo">
            <img src={logo} alt="logo" />
          </div>
          <Button onClick={handleSignOut}>Đăng xuất</Button>
        </div>
      </div>
      <div className="verify-container">
        <div style={{ marginTop: 32, position: "relative" }}>
          {loading && <ThreeDotLoader limit="term" />}
          <SectionWrapper title="Nhập mã từ email của bạn">
            <div>
              <p className="verify-container-title">
                Để đảm bảo đây chính là email của bạn, hãy nhập mã mà chúng tôi
                đã gửi qua email đến{" "}
                <span style={{ fontWeight: 600 }}>{currentUser?.email}</span>.
              </p>
              <div className="verify-content">
                <Input.OTP
                  autoFocus
                  onChange={onChange}
                  formatter={(str) => str.toUpperCase()}
                />
                {messageVerify && (
                  <p style={{ color: "red" }}>{messageVerify}</p>
                )}
                <Button onClick={handleSendOTP} loading={loadingSend}>
                  Gửi lại mã
                </Button>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </div>
    </div>
  );
}

export default Verify;
