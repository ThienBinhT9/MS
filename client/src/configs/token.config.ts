import axios from "axios";
import { Dispatch } from "react";
import { UnknownAction } from "redux";
import { toast } from "react-toastify";
import { jwtDecode, JwtPayload } from "jwt-decode";

import { setSignIn } from "../redux/auth-slice.ts";
import { setCurrentUser } from "../redux/user-slice.ts";
import { refreshToken } from "../services/auth-service.ts";

interface IToken {
  access_token: string;
  refresh_token: string;
  userId: string;
}

export const createAxios = (
  tokens: IToken,
  dispatch: Dispatch<UnknownAction>
) => {
  const newInstance = axios.create();

  newInstance.interceptors.request.use(async (config) => {
    let date = new Date();

    const decode_token: JwtPayload = jwtDecode<JwtPayload>(tokens.access_token);
    if (decode_token.exp && decode_token.exp < date.getTime() / 1000) {
      const _tokens = await refreshToken(tokens.refresh_token, tokens.userId);
      if (_tokens.code !== 200) {
        dispatch(setSignIn({}));
        dispatch(setCurrentUser(null));
        toast("Vui lòng đăng nhập lại", { type: "info" });
      } else
        dispatch(
          setSignIn({
            ..._tokens.metadata,
            userId: tokens.userId,
          })
        );

      config.headers = {
        client_id: tokens.userId,
        access_token: _tokens.metadata.access_token,
        refresh_token: _tokens.metadata.refresh_token,
      } as any;
    }

    return config;
  });

  return newInstance;
};
