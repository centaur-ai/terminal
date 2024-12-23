import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    common: {
      "Content-Type": "application/json",
    },
  },
});

export default instance;
