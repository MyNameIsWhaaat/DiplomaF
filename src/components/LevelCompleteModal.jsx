const LevelCompleteModal = ({ xp, time, mistakes, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl text-center">
        <h2 className="text-2xl font-bold text-[#8278F6] mb-4">Уровень завершён!</h2>
        <div className="space-y-2 text-lg">
          <p>🎯 Получено XP: <strong>{xp}</strong></p>
          <p>⏱ Время: <strong>{time} сек</strong></p>
          <p>❌ Ошибки: <strong>{mistakes}</strong></p>
        </div>
        <button
          className="mt-6 bg-[#8278F6] text-white px-6 py-2 rounded-full hover:bg-[#6f66e0]"
          onClick={onClose}
        >
          Вернуться к уровням
        </button>
      </div>
    </div>
  );
};

export default LevelCompleteModal;
