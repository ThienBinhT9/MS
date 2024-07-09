import axios, { AxiosRequestConfig } from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";

import { refreshToken } from "../services/auth-service.ts";
import { setSignIn } from "../redux/auth-slice.ts";
import { Dispatch } from "react";
import { UnknownAction } from "redux";

const createAxios = (tokens, dispatch: Dispatch<UnknownAction>) => {
  const newInstance = axios.create();

  newInstance.interceptors.request.use(async (config) => {
    let date = new Date();

    const decode_token: JwtPayload = jwtDecode<JwtPayload>(tokens.access_token);
    if (decode_token.exp && decode_token.exp < date.getTime() / 1000) {
      const _tokens = await refreshToken(tokens.refresh_token, tokens.userId);
      dispatch(setSignIn(_tokens));
      const config: AxiosRequestConfig = {
        client_id: tokens.userId,
        refresh_token: _tokens.refresh_token,
        access_token: _tokens.access_token,
      };
      config.headers = config;
    }

    return config;
  });

  return newInstance;
};

export default createAxios;
