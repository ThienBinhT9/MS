import { Dispatch } from "react";
import axios, { AxiosInstance } from "axios";
import { UnknownAction } from "redux";
import { toast } from "react-toastify";
import { NavigateFunction } from "react-router-dom";

import { setLoading, setCurrentUser, setClient } from "../redux/user-slice.ts";
import { ITokens } from "../interfaces/common-interface.ts";
import { getNumberOfFriends } from "./friend-service.ts";

const HOST = "http://localhost:8000";

export const updateUser = async (
  axiosInstance: AxiosInstance,
  body: any,
  token: ITokens,
  dispatch: Dispatch<UnknownAction>,
  navigate?: NavigateFunction
) => {
  try {
    dispatch(setLoading(true));
    const result = await axiosInstance.patch(`${HOST}/user/update`, body, {
      headers: {
        client_id: token.userId,
        access_token: token.access_token,
      },
    });
    if (result.data.code === 200) {
      dispatch(setCurrentUser(result.data.metadata));
      return navigate && navigate("/");
    }
    toast(result?.data?.message, { type: "error" });
  } catch (error) {
    return toast(error.response?.data?.message, { type: "error" });
  } finally {
    dispatch(setLoading(false));
  }
};

export const getInfo = async (
  axiosInstance: AxiosInstance,
  id: any,
  token: ITokens,
  dispatch: Dispatch<UnknownAction>
) => {
  try {
    dispatch(setLoading(true));
    const result = await axiosInstance.get(`${HOST}/user/detail/${id}`, {
      headers: {
        client_id: token.userId,
        access_token: token.access_token,
      },
    });
    if (result.data.code === 200) {
      dispatch(setClient(result.data.metadata));
      return result.data.metadata;
    }
    toast(result?.data?.message, { type: "error" });
    return null;
  } catch (error) {
    return toast(error.response?.data?.message, { type: "error" });
  } finally {
    dispatch(setLoading(false));
  }
};

export const identify = async (
  body: any,
  dispatch: Dispatch<UnknownAction>
) => {
  try {
    dispatch(setLoading(true));
    const result = await axios.post(`${HOST}/user/identify`, body);
    if (result.data.code !== 200)
      return toast(result?.data?.message, { type: "error" });

    return result.data;
  } catch (error) {
    return toast(error.response?.data?.message, { type: "error" });
  } finally {
    dispatch(setLoading(false));
  }
};

