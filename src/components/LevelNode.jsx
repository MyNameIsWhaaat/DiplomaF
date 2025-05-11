import React, { useState, useRef } from "react";
import WaveConnector from "../components/WaveConnector";
import API from "../API/index";
import { useNavigate } from "react-router-dom";

const LevelNode = ({ level, index, isLast }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const hideTimeout = useRef(null); // храним id таймера
    const navigate = useNavigate();

    const handleEnter = () => {
        clearTimeout(hideTimeout.current);
        setShowTooltip(true);
    };

    const handleLeave = () => {
        hideTimeout.current = setTimeout(() => {
            setShowTooltip(false);
        }, 200); // задержка перед исчезновением
    };

    const isCompleted = level.is_completed;
    const isCurrent = level.is_current;

    return (
        <div
            className="relative flex items-center group"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            {/* Кружок */}
            <div
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-10 transition-all duration-300
          ${isCurrent ? "bg-[#8278F6] ring-4 ring-[#C7C4E9]" : ""}
          ${isCompleted ? "bg-[#8278F6]" : ""}
          ${!isCompleted && !isCurrent ? "bg-gray-300 opacity-60 cursor-not-allowed" : ""}
        `}
            >
                {isCompleted ? (
                    <img src="/compLevel.png" alt="Completed" className="w-16 h-16" />
                ) : (
                    <span className="text-white text-xl font-bold">&lt;/&gt;</span>
                )}
            </div>
            {/* Всплывашка */}
            {showTooltip && (
                <div className="absolute bottom-[-470%] left-1/2 -translate-x-1/2 w-72 p-6 rounded-3xl shadow-xl z-20 bg-gradient-to-b from-[#8278F6] to-[#C7C4E9] text-white">
                    <h3 className="text-xl font-Montserrat mb-4 min-h-[56px] text-center break-words">
                        {level.title}
                    </h3>

                    <div className="flex justify-between text-center text-black bg-white rounded-xl py-2 px-3 mb-4">
                        <div>
                            <p className="text-xs flex items-center justify-center gap-1">
                                <img src="/Clock.png" alt="Completed" className="w-6 h-6" /> Время
                            </p>
                            <p className="text-lg font-extrabold">{level.time_spent ?? 0}</p>
                        </div>
                        <div>
                            <p className="text-xs flex items-center justify-center gap-1">
                                <img src="/Fire.png" alt="Completed" className="w-6 h-6" /> Баллы
                            </p>
                            <p className="text-lg font-extrabold">{level.xp_earned ?? 0}</p>
                        </div>
                        <div>
                            <p className="text-xs flex items-center justify-center gap-1">
                                <img src="/Cancel.png" alt="Completed" className="w-6 h-6" /> Ошибки
                            </p>
                            <p className="text-lg font-extrabold">{level.mistakes ?? 0}</p>
                        </div>
                    </div>

                    <button className="w-full bg-white text-[#8278F6] font-bold py-2 rounded-full mb-2 hover:brightness-95">
                        Изучить теорию
                    </button>
                    {isCompleted ? (
                        <button className="w-full border border-white text-white font-bold py-2 rounded-full hover:bg-white hover:text-[#8278F6] transition">
                            Пройти заново
                        </button>
                    ) : (
                        <button
                            className="w-full bg-white text-[#8278F6] font-bold py-2 rounded-full hover:brightness-95 transition"
                            onClick={async () => {
                                try {
                                    await API.post(`/courses/level/${level.id}/start`);
                                    navigate(`/courses/level/${level.id}`); // <-- вот это теперь правильно
                                } catch (err) {
                                    console.error("Ошибка запуска уровня:", err);
                                    alert("Не удалось начать уровень");
                                }
                            }}
                        >
                            Пройти уровень
                        </button>
                    )}
                </div>
            )}

            {/* Линия */}
            {!isLast && <WaveConnector />}
        </div>
    );
};

export default LevelNode;