// API/theory.js
import API from "./index";

export const getTheoryByLevel = (levelId) =>
  API.get(`/levels/${levelId}/theory`);
