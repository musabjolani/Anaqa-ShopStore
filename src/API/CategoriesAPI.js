import axios from "axios";
import Config from "../config.json";

export const getCategories = async () => {
  return (await axios.get(`${Config.apiURL}Categories/getAll`)).data;
};
