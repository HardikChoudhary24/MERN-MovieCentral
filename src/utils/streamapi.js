import axios from "axios";

const BASE_URL = "https://streaming-availability.p.rapidapi.com";

const RapidAPI_Key = import.meta.env.VITE_APP_X_RAPIDAPI_KEY;
const headers = {
  "X-RapidAPI-Key": `${RapidAPI_Key}`,
};


export const fetchPlatforms = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (error) {}
};
