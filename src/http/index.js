import axios from "axios";
import config from "../../config";

const instance = axios.create({
  baseURL: config.api,
  headers: {
    common: {
      "Content-Type": "application/json",
    },
  },
});

export default instance;
