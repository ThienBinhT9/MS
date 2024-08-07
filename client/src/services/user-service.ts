import { Dispatch } from "react";
import { AxiosInstance } from "axios";
import { UnknownAction } from "redux";
import { toast } from "react-toastify";
import { NavigateFunction } from "react-router-dom";

import { setLoading, setCurrentUser } from "../redux/user-slice.ts";
import { ITokens } from "../interfaces/common-interface.ts";

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
      if (id === result.data.metadata._id)
        dispatch(setCurrentUser(result.data.metadata));
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
