import { Dispatch } from "react";
import { UnknownAction } from "redux";
import { toast } from "react-toastify";
import { NavigateFunction } from "react-router-dom";

import { setLoading, setCurrentUser } from "../redux/user-slice.ts";

const HOST = "http://localhost:8000";

export const AddInfo = async (
  body,
  navigate: NavigateFunction,
  dispatch: Dispatch<UnknownAction>
) => {
  try {
  } catch (error) {
    return toast(error.response?.data?.message, { type: "error" });
  } finally {
  }
};
