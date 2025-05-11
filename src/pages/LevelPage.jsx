import { useParams, useNavigate } from "react-router-dom";
import { useLevelTasks } from "../hooks/useLevelTasks";
import { useState, useEffect } from "react";
import TaskRenderer from "../components/TaskRender";
import LevelCompleteModal from "../components/LevelCompleteModal";
import API from "../API/index";

const LevelPage = () => {
  const { id: levelId } = useParams();
  const navigate = useNavigate();
  const { tasks, loading } = useLevelTasks(levelId);

  const [index, setIndex] = useState(0);
  const [xpTotal, setXpTotal] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [startTime] = useState(Date.now());
  const [showSummary, setShowSummary] = useState(false);

  const task = tasks[index];

  const handleComplete = async (isCorrect, earnedXP) => {
    if (!isCorrect) setMistakes((m) => m + 1);
    setXpTotal((xp) => xp + earnedXP);

    if (index + 1 >= tasks.length) {
      try {
        await API.post(`/api/courses/complete/level/${levelId}`);
      } catch (err) {
        console.error("Ошибка завершения уровня", err);
      }
      setShowSummary(true);
    } else {
      setIndex(index + 1);
    }
  };

  const handleSummaryClose = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000); // в секундах
    setShowSummary(false);
    navigate(`/courses/${/* courseId */ 1}/levels`); // TODO: заменить на реальный courseId
  };

  if (loading) return <p>Загрузка...</p>;
  if (!tasks.length) return <p>Нет заданий</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Уровень {levelId}</h1>
      {!showSummary && (
        <TaskRenderer task={task} onComplete={handleComplete} />
      )}
      {showSummary && (
        <LevelCompleteModal
          xp={xpTotal}
          time={Math.round((Date.now() - startTime) / 1000)}
          mistakes={mistakes}
          onClose={handleSummaryClose}
        />
      )}
    </div>
  );
};

export default LevelPage;
