import axios from "axios";
// import { API_URL } from "app/config";

export const request = (API_URL, token = "") => {
 
  const defaultOptions = {
    headers: {
      Authorization: `Bearer ${token}`,
      // "Content-Type": "application/x-www-form-urlencoded"
      "Content-Type": "application/json"
    },
    timeout: 15000,
  };
  /*
  |--------------------------------------------------
  | Custom axios api
  |--------------------------------------------------
  */
  const axiosApi = axios.create({
    baseURL: API_URL,
    ...defaultOptions,
  });

  return axiosApi;
};

export default request;