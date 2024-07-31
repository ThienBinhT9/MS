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

  // useEffect(() => {
  //   if (!currentUser?.isUpdateProfile) navigate("/add-info");
  // }, [currentUser, navigate]);

  return <Outlet />;
}

export default ProtectRoute;
