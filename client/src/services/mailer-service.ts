import { AxiosInstance } from "axios";
import { ITokens } from "../interfaces/common-interface";

const HOST = "http://localhost:8000";

export const sendOTP = async (
  axiosInstance: AxiosInstance,
  body: { email: any },
  token: ITokens
) => {
  try {
    const result = await axiosInstance.post(`${HOST}/mail/send-otp`, body, {
      headers: {
        client_id: token.userId,
        access_token: token.access_token,
      },
    });
    return result.data;
  } catch (error) {
    return null;
  }
};

export const verifyOTP = async (
  axiosInstance: AxiosInstance,
  body: { token: string; otp: string },
  token: ITokens
) => {
  try {
    const result = await axiosInstance.post(`${HOST}/mail/verify-otp`, body, {
      headers: {
        client_id: token.userId,
        access_token: token.access_token,
      },
    });
    return result.data;
  } catch (error) {
    return null;
  }
};
