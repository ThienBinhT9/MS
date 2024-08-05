import { Dispatch } from "react";
import { AxiosInstance } from "axios";
import { UnknownAction } from "redux";
import { toast } from "react-toastify";
import { NavigateFunction } from "react-router-dom";

import { setLoading, setCurrentUser } from "../redux/user-slice.ts";
import { ITokens } from "../interfaces/common-interface.ts";

const HOST = "http://localhost:8000";

export const addInfo = async (
  axiosInstance: AxiosInstance,
  body: any,
  token: ITokens,
  navigate: NavigateFunction,
  dispatch: Dispatch<UnknownAction>
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
      return navigate("/");
    }
    toast(result?.data?.message, { type: "error" });
  } catch (error) {
    return toast(error.response?.data?.message, { type: "error" });
  } finally {
    dispatch(setLoading(false));
  }
};
