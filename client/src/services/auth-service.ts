import { Dispatch } from "react";
import { UnknownAction } from "redux";
import { toast } from "react-toastify";
import axios, { AxiosInstance } from "axios";
import { NavigateFunction } from "react-router-dom";

import { IParamsLogin, IParamsRegister } from "../interfaces/auth-interface.ts";
import { setLoading, setSignIn, setSignUp } from "../redux/auth-slice.ts";
import { setCurrentUser } from "../redux/user-slice.ts";
import { ITokens } from "../interfaces/common-interface.ts";

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
      const { access_token, refresh_token, _id, ...userData } =
        result.data.metadata;
      dispatch(setSignIn({ access_token, refresh_token, userId: _id }));
      dispatch(setCurrentUser({ ...userData, _id }));
      return navigate("/");
    }
    toast(result?.data?.message, { type: "error" });
  } catch (error) {
    return toast(error.response?.data?.message, { type: "error" });
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
      const { access_token, refresh_token, _id, ...dataUser } =
        result.data.metadata;
      dispatch(setSignUp({ access_token, refresh_token, userId: _id }));
      dispatch(setCurrentUser({ ...dataUser, _id }));
      return navigate("/");
    }
    toast(result?.data?.message, { type: "error" });
  } catch (error) {
    return toast(error?.response?.data?.message, { type: "error" });
  } finally {
    dispatch(setLoading(false));
  }
};

export const signOut = async (
  axiosInstance: AxiosInstance,
  token: ITokens,
  navigate: NavigateFunction,
  dispatch: Dispatch<UnknownAction>
) => {
  try {
    dispatch(setLoading(true));
    const result = await axiosInstance.post(
      `${HOST}/auth/sign-out`,
      token.userId,
      {
        headers: {
          access_token: token.access_token,
          client_id: token.userId,
        },
      }
    );
    if (result.data.code === 200) {
      dispatch(setSignIn({}));
      dispatch(setCurrentUser(null));
      return navigate("/auth/sign-in");
    }
    toast(result?.data?.message, { type: "error" });
    return result?.data;
  } catch (error) {
    toast(error?.response?.data?.message, { type: "error" });
  } finally {
    dispatch(setLoading(false));
  }
};

export const refreshToken = async (refresh_token: string, userId: string) => {
  try {
    const result = await axios.post(`${HOST}/auth/refresh-token`, userId, {
      headers: {
        refresh_token,
        client_id: userId,
      },
    });
    return result?.data;
  } catch (error) {
    return error?.message;
  }
};
