import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000", // твой бэкенд
  withCredentials: true, // если нужны куки
});

export const signIn = (data) => API.post("/auth/sign-in", data);
export const signUp = (data) => API.post("/auth/sign-up", data);