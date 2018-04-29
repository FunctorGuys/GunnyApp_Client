import axios from "axios";
import { API_URL } from "app/config";

export const request = (
  opts = {},
) => {
  const defaultOptions = {
    headers: {
      ...opts,
    },
  };
  /*
  |--------------------------------------------------
  | Custom axios api
  |--------------------------------------------------
  */
  const axiosApi = axios.create({
    baseURL: API_URL,
  });

  return {
    get: (url, options = {}) =>
      axiosApi.get(url, { ...defaultOptions, ...options }),
    post: (url, data, options = {}) =>
      axiosApi.post(url, data, { ...defaultOptions, ...options }),
    put: (url, data, options = {}) =>
      axiosApi.put(url, data, { ...defaultOptions, ...options }),
    patch: (url, data, options = {}) =>
      axiosApi.put(url, data, { ...defaultOptions, ...options }),
    delete: (url, options = {}) =>
      axiosApi.delete(url, { ...defaultOptions, ...options }),
  };
};

export default request;
