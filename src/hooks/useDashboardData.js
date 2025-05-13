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
      setCoursesWithProgress(Array.isArray(withProgress.data) ? withProgress.data : []);
      setCoursesWithoutProgress(Array.isArray(withoutProgress.data) ? withoutProgress.data : []);
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
    await API.post(`/courses/start/${courseId}`);

    // 🧠 Ждём загрузку свежих данных
    await Promise.all([fetchCourses(), fetchUser()]);

    // ✅ Закрываем модалку только после загрузки новых данных
    setSelectedCourse(null);
  } catch (err) {
    console.error("Ошибка запуска курса:", err);
    alert("Не удалось начать курс. Попробуйте позже.");
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
