import axios from "axios";

const BASE_URL = "https://streaming-availability.p.rapidapi.com";

const headers = {
  "X-RapidAPI-Key": "8f00895bc1msh740bc46a053e615p1e3ef5jsne002edc75198",
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
