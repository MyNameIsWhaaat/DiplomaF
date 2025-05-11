import API from "./index"; // ← твой axios instance

export const getLevelsByCourseId = async (courseId) => {
  const response = await API.get(`/courses/${courseId}/levels`);
  return response.data;
};
