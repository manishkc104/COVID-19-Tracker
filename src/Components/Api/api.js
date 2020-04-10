import axios from "axios";

const API_URL = "https://covid19.mathdro.id/api";

export const fetchApiData = () => {
  try {
    return axios.get(API_URL);
  } catch (e) {
    console.log(e);
  }
};

export const fetchDailyData = () => {
  try {
    return axios.get(`${API_URL}/daily`);
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllCountries = () => {
  return axios.get(`${API_URL}/countries`);
};

export const fetchCountriesById = country => {
  if (country) {
    return axios.get(`${API_URL}/countries/${country}`);
  }
  return fetchApiData();
};
