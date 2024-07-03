import axios from "axios";
import { Dispatch } from "react";
import { UnknownAction } from "redux";
import { toast } from "react-toastify";
import { NavigateFunction } from "react-router-dom";

import { IParamsLogin, IParamsRegister } from "../interfaces/auth-interface.ts";
import { setLoading, setSignIn, setSignUp } from "../redux/auth-slice.ts";
import { setCurrentUser } from "../redux/user-slice.ts";

const HOST = "http://localhost:8000";

export const signIn = async (
  body: IParamsLogin,
  navigate: NavigateFunction,
  dispatch: Dispatch<UnknownAction>
) => {
  try {
    dispatch(setLoading(true));
    const result = await axios.post(`${HOST}/auth/sign-in`, body);
    if (result.data.code === 200) {
      const { access_token, refresh_token, ...userData } = result.data.metadata;
      dispatch(setSignIn({ access_token, refresh_token }));
      dispatch(setCurrentUser(userData));
      return navigate("/");
    }
    toast(result.data.message, { type: "error" });
  } catch (error) {
    return toast(error.response.data.message, { type: "error" });
  } finally {
    dispatch(setLoading(false));
  }
};

export const signUp = async (
  body: IParamsRegister,
  navigate: NavigateFunction,
  dispatch: Dispatch<UnknownAction>
) => {
  try {
    dispatch(setLoading(true));
    const result = await axios.post(`${HOST}/auth/sign-up`, body);
    if (result.data.code === 201) {
      const { access_token, refresh_token, ...dataUser } = result.data.metadata;
      dispatch(setSignUp({ access_token, refresh_token }));
      dispatch(setCurrentUser(dataUser));
      return navigate("/");
    }
    toast(result.data.message, { type: "error" });
  } catch (error) {
    return toast(error.response.data.message, { type: "error" });
  } finally {
    dispatch(setLoading(false));
  }
};

export const signOut = async (
  navigate: NavigateFunction,
  dispatch: Dispatch<UnknownAction>
) => {
  try {
    setLoading(true);
    const result = await axios.post(`${HOST}/auth/sign-out`);
    if (result.data.code === 200) {
      dispatch(setSignIn({}));
      dispatch(setCurrentUser(null));
      return navigate("/auth/sign-in");
    }
    toast(result.data.message, { type: "error" });
  } catch (error) {
    toast(error.response.data.message, { type: "error" });
  } finally {
    setLoading(false);
  }
};
