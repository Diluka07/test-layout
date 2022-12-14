import axios from "axios";
import setAuthToken from "../Utils/setAuthToken";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const addNewItem = async (data) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const res = await axios.post("/api/musicalItems",data, config);
  return res;
};

export const getAllCategories = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
   const res = await axios.get("/api/categories", config);
   return res;
};

export const getAllMusicalItems = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
   const res = await axios.get("/api/musicalItems", config);
   return res;
};

export const getExistingMusicalItem = async (id) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
   const res = await axios.get(`/api/musicalItems/${id}`, config);
   return res;
};                