import API from "./index";

export const getUserProfile = () => {
  return API.get("/user/me");
};