import "../pages/pages.css"

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

const LevelCompleteModal = ({ xp, time, mistakes, onClose }) => {
  const canvasRef = useRef(null);

useEffect(() => {
  if (!canvasRef.current) return;

  const myConfetti = confetti.create(canvasRef.current, {
    resize: true,
    useWorker: true,
  });

  let count = 0;
  const interval = setInterval(() => {
    myConfetti({
      particleCount: 100,
      spread: 80 + Math.random() * 40,
      origin: { y: 0.6 },
    });
    count++;
    if (count >= 5) clearInterval(interval); // ❗ 5 запусков и стоп
  }, 1000); // каждые 600 мс

  return () => clearInterval(interval); // чистим при размонтировании
}, []);


  return (
    <div className="fixed inset-0 flex items-center justify-center  z-50 min-h-screen bg-[url('/levelBack.png')] bg-cover bg-center">

      {/* Конфетти-слой */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" />

      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl text-center z-10 relative">
        <img
          src="https://assets.ppy.sh/user-profile-covers/34223468/aac559df30c6708d19153dcacf8dcbaf843548b4c5438def329ed4763c408c9f.gif"
          alt="celebration"
          className="mx-auto mb-4"
        />
        <h2 className="text-2xl MontserratBold text-[#8278F6] mb-4">Уровень завершён!</h2>
        <div className="space-y-2 text-lg MonstReg">
          <p>Получено XP: <strong>{Number(xp) || 0}</strong></p>
          <p>Время: <strong>{time ?? 0} сек</strong></p>
          <p>Ошибки: <strong>{mistakes ?? 0}</strong></p>
        </div>
        <button
          className="mt-6 bg-[#8278F6] text-white px-6 py-2 rounded-full hover:bg-[#6f66e0] MontserratBold"
          onClick={onClose}
        >
          Вернуться к уровням
        </button>
      </div>
    </div>
  );
};

export default LevelCompleteModal;