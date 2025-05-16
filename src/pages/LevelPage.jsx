import { useParams, useNavigate } from "react-router-dom";
import { useLevelTasks } from "../hooks/useLevelTasks";
import { useState } from "react";
import TaskRenderer from "../components/TaskRender";
import LevelCompleteModal from "../components/LevelCompleteModal";
import API from "../API/index";
import "../pages/pages.css"

const LevelPage = () => {
  const { id: levelId } = useParams();
  const navigate = useNavigate();
  const { tasks, loading } = useLevelTasks(levelId);

  const [index, setIndex] = useState(0);
  const [xpTotal, setXpTotal] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [startTime] = useState(Date.now());
  const [showSummary, setShowSummary] = useState(false);

  // Режим работы над ошибками
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [reviewTasks, setReviewTasks] = useState([]);

  const [summaryStats, setSummaryStats] = useState({ xp: 0, mistakes: 0, time: 0 });

  const currentTasks = isReviewMode ? reviewTasks : tasks;
  const task = currentTasks[index];

  const [showReviewModal, setShowReviewModal] = useState(false);

  const handleComplete = async (isCorrect, earnedXP) => {
    if (!isCorrect) setMistakes((m) => m + 1);
    if (!isReviewMode) setXpTotal((xp) => xp + earnedXP); // в режиме review XP не считаем

    if (index + 1 >= currentTasks.length) {
      if (!levelId) return;

      try {
        // Проверка наличия задач с ошибками
        const reviewRes = await API.get(`/tasks/review-tasks/${levelId}`);
        const review = reviewRes.data;

        if (review && review.length > 0) {
          setIsReviewMode(true);
          setReviewTasks(review);
          setIndex(0);
          setXpTotal(0);
          setMistakes(0);
          setShowReviewModal(true);
          return;
        }

        // ❗ Тут нужно получить данные ОТ POST-запроса
        const completeRes = await API.post(`/courses/complete/level/${levelId}`);
        setSummaryStats(completeRes.data); // ✅ сюда сохраняем XP и mistakes
        setShowSummary(true);
      } catch (err) {
        console.error("Ошибка завершения уровня или получения review-задач", err);
      }
    } else {
      setIndex(index + 1);
    }
  };

  const handleSummaryClose = () => {

    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    setShowSummary(false);
    navigate(`/courses/${1}/levels`); // TODO: заменить на реальный courseId
  };

  if (loading) return <p>Загрузка...</p>;
  if (!tasks.length) return <p>Нет заданий</p>;

  return (
    <>
    <div className="p-10 min-h-screen bg-[url('/levelBack.png')] bg-cover bg-center">
      <h1 className="text-2xl font-bold mb-6">
        {isReviewMode ? "Работа над ошибками" : `Прохождение уровня`}
      </h1>

      {!showSummary && task && (
        <TaskRenderer task={task} onComplete={handleComplete} />
      )}

      {showSummary && (
        <LevelCompleteModal
          xp={summaryStats.xp}
          time={Math.round((Date.now() - startTime) / 1000)}
          mistakes={summaryStats.mistakes}
          onClose={handleSummaryClose}
        />
      )}
    </div>
    {showReviewModal && (
  <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md text-center">
      <h3 className="text-lg font-semibold mb-2 text-[#8278F6]">Работа над ошибками</h3>
      <p className="mb-4 text-gray-700">Есть ошибки! Нужно пройти задания ещё раз, чтобы закрепить материал.</p>
      <button
        onClick={() => setShowReviewModal(false)}
        className="bg-[#8278F6] text-white px-4 py-2 rounded-lg hover:bg-[#6c61f0] transition"
      >
        Начать повтор
      </button>
    </div>
  </div>
)}
    </>
  );
  
};

export default LevelPage;
