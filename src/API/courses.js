import API from "./index";

// Получение курсов с прогрессом
export const getCoursesWithProgress = async () => {
  const response = await API.get("/courses/with-progress");
  return response.data; // или просто response, если хочешь обрабатывать статус
};

// Получение курсов без прогресса
export const getCoursesWithoutProgress = async () => {
  const response = await API.get("/courses/without-progress");
  return response.data;
};
