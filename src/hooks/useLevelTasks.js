import { useState, useEffect } from "react";
import API from "../API/index";

export const useLevelTasks = (levelId) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await API.get(`/courses/level/${levelId}/tasks`);
        setTasks(res.data);
      } catch (err) {
        console.error("Ошибка при загрузке заданий:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [levelId]);

  return { tasks, loading };
};
