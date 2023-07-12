import axios from "axios";

let baseURL = process.env.NEXT_PUBLIC_URL;

export const axiosinstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
  },
  withCredentials: true,
});
