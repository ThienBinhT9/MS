import axios, { AxiosInstance } from "axios";
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

export const sendBaseOTP = async (body: any) => {
  try {
    const result = await axios.post(`${HOST}/mail/send-otp-v2`, body);
    if (result.data.code === 200) return result.data;
    return null;
  } catch (error) {
    return null;
  }
};

export const verifyBaseOTP = async (body: { token: string; otp: string }) => {
  try {
    const result = await axios.post(`${HOST}/mail/verify-otp-v2`, body);
    if (result.data.code === 200) return result.data;
    return null;
  } catch (error) {
    return null;
  }
};
