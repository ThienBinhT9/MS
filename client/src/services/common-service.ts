import axios from "axios";

export const getLocation = async (q: string | number) => {
  try {
    const result = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${q}&countrycode=VN&key=7523c962d9474c0e999d039e3a960f48`
    );
    if (result.data.status.code === 200)
      return result?.data?.results?.map((item) => ({
        label: item?.formatted,
        value: item?.formatted,
      }));
    return [];
  } catch (error) {
    return [];
  }
};
