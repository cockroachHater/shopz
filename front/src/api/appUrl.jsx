import axios from "axios";

export const appUrl = axios.create({
  baseURL: process.env["REACT_APP_API"],
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});
