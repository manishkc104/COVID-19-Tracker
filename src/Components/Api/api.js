import axios from "axios";

const API_URL = "https://covid19.mathdro.id/api";

export const getApiData = async () => {
  try {
    return await axios.get(API_URL);
  } catch (e) {
    console.log(e);
  }
};
