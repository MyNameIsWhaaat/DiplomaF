import { useEffect, useState } from "react";
import { getUserProfile } from "../API/userData";
import { getCoursesWithProgress, getCoursesWithoutProgress } from "../API/courses";
import API from "../API";

export const useDashboardData = () => {
  const [coursesWithProgress, setCoursesWithProgress] = useState([]);
  const [coursesWithoutProgress, setCoursesWithoutProgress] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchCourses();
    fetchUser();
  }, []);

  const fetchCourses = async () => {
    try {
      const [withProgress, withoutProgress] = await Promise.all([
        getCoursesWithProgress(),
        getCoursesWithoutProgress(),
      ]);
      setCoursesWithProgress(withProgress.data);
      setCoursesWithoutProgress(withoutProgress.data);
    } catch (err) {
      console.error("Ошибка загрузки курсов:", err);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await getUserProfile();
      setUser(res.data);
    } catch (err) {
      console.error("Ошибка при загрузке профиля:", err);
    }
  };

  const handleStartCourse = async (courseId) => {
    try {
      await API.post(`/courses/${courseId}/start`);
      alert("Курс начат!");
      setSelectedCourse(null);
      fetchCourses();
    } catch (err) {
      console.error(err);
      alert("Ошибка при запуске курса");
    }
  };

  return {
    coursesWithProgress,
    coursesWithoutProgress,
    selectedCourse,
    setSelectedCourse,
    user,
    handleStartCourse,
  };
};
