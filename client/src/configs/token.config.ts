import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";

import { refreshToken } from "../services/auth-service.ts";
import { setSignIn } from "../redux/auth-slice.ts";
import { Dispatch } from "react";
import { UnknownAction } from "redux";

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
      dispatch(setSignIn(_tokens));

      config.headers = {
        client_id: tokens.userId,
        access_token: _tokens.access_token,
        refresh_token: _tokens.refresh_token,
      } as any;
    }

    return config;
  });

  return newInstance;
};
