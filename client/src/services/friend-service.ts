import { AxiosInstance } from "axios";
import { ITokens } from "../interfaces/common-interface";

const HOST = "http://localhost:8000";

export const getNumberOfFriends = async (
  axiosInstance: AxiosInstance,
  friendId: any,
  token: ITokens
) => {
  try {
    const result = await axiosInstance.get(
      `${HOST}/friendship/numberOfFriend/${friendId}`,
      {
        headers: {
          client_id: token.userId,
          access_token: token.access_token,
        },
      }
    );
    if (result.data.code === 200) return result.data.metadata;
    return null;
  } catch (error) {
    return null;
  }
};
