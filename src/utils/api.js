import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
// const TMDB_TOKEN = import.meta.env.VEET_APP_TMDB_TOKEN;
const TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzFmODA0MDY2ODQ2NTZhMTEwNzQ5NGFiOTYzYjQ1MyIsInN1YiI6IjY0ZTFkYTY0ZTE5ZGU5MDEzYTI4ZGIwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RgsyYcOEXgaQyoAFR9LPyU-OXCWaqEhGNORU28BxI1A";

const headers = {
  Authorization: `bearer ${TMDB_TOKEN}`,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (error) {}
};
