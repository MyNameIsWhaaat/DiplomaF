import { useEffect, useState } from "react";
import { getCoursesWithProgress} from "../API/courses";
import { getLevelsByCourseId } from "../API/levels";

export const useCourseLevels = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [levels, setLevels] = useState([]);

  // Получаем курсы
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCoursesWithProgress();
        setCourses(data.data);
        if (data.length > 0) {
          setSelectedCourseId(data[0].id);
        }
      } catch (err) {
        console.error("Ошибка загрузки курсов:", err);
      }
    };

    fetchCourses();
  }, []);

  // Получаем уровни выбранного курса
  useEffect(() => {
    if (!selectedCourseId) return;

    const fetchLevels = async () => {
      try {
        const data = await getLevelsByCourseId(selectedCourseId);
        setLevels(data);
      } catch (err) {
        console.error("Ошибка загрузки уровней:", err);
      }
    };

    fetchLevels();
  }, [selectedCourseId]);

  return {
    courses,
    selectedCourseId,
    setSelectedCourseId,
    levels,
  };
};
