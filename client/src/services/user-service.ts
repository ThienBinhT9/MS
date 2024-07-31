import { Dispatch } from "react";
import { UnknownAction } from "redux";
import { toast } from "react-toastify";
import { NavigateFunction } from "react-router-dom";

import { setLoading, setCurrentUser } from "../redux/user-slice.ts";

const HOST = "http://localhost:8000";

export const AddInfo = async (
  axiosInstance,
  body,
  user,
  navigate: NavigateFunction,
  dispatch: Dispatch<UnknownAction>
) => {
  try {
    dispatch(setLoading(true));
    const result = await axiosInstance.patch(`${HOST}/user/update`, body, {
      headers: {
        client_id: user.userId,
        access_token: user.access_token,
      },
    });
    if (result.data.code === 200) {
    }
  } catch (error) {
    return toast(error.response?.data?.message, { type: "error" });
  } finally {
  }
};
