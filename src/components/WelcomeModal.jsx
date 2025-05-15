import { motion } from "framer-motion";
import Confetti from "react-confetti";

const WelcomeModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl p-8 w-full max-w-xl shadow-2xl relative overflow-hidden text-center"
      >
        <Confetti numberOfPieces={150} recycle={false} />

        <img
          src="/avatar.png"
          alt="Hero"
          className="w-40 h-40 mx-auto mb-4 rounded-full border-4 border-[#C7C4E9] shadow-md"
        />

        <h2 className="text-3xl font-bold text-[#8278F6] mb-2">Добро пожаловать в Академию Алгория</h2>

        <p className="text-gray-700 text-md mb-4 leading-relaxed">
          Ты оказался среди избранных, кому доверено восстановить утраченное Знание.  
          <br />
          Каждая задача — это <strong>замок</strong>. XP — <span className="text-[#8278F6] font-bold">твой ключ</span> 🔓.  
        </p>

        <div className="bg-[#F9F7FF] text-[#333] rounded-xl py-3 px-4 mb-4 text-sm shadow-sm">
          📌 <strong>Подсказка:</strong> пройди уровень без ошибок, чтобы получить <span className="text-green-600 font-semibold">бонусный XP</span>.
        </div>

        <div className="bg-[#C7C4E9] text-[#333] rounded-xl py-2 px-4 mb-4 text-sm">
          ⏳ Путь будет непрост… но каждый шаг приближает тебя к мастерству.
        </div>

        <button
          onClick={onClose}
          className="bg-[#8278F6] hover:bg-[#6f68e0] text-white font-bold px-6 py-2 rounded-md w-full"
        >
          Готов начать путь!
        </button>
      </motion.div>
    </div>
  );
};

export default WelcomeModal;