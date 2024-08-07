import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store.ts";
import { Outlet, useNavigate } from "react-router-dom";

function ProtectRoute() {
  const { token } = useSelector((state: RootState) => state.auth);
  const { currentUser } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token.access_token) navigate("/auth/sign-in");
  }, [token, navigate]);

  useEffect(() => {
    if (token.access_token && !currentUser?.isVerified) navigate("/verify");
  }, [navigate, currentUser, token]);

  return <Outlet />;
}

export default ProtectRoute;
