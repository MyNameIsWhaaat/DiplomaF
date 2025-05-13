import React, { useState, useRef } from "react";
import WaveConnector from "../components/WaveConnector";
import API from "../API/index";
import { useNavigate } from "react-router-dom";
import "../pages/pages.css"

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
    const isUnlocked = level.is_unlocked;

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
          ${!isCompleted && !isCurrent ? "bg-gray-300 opacity-60 " : ""}
        `}
            >
                {isCompleted ? (
                    <img src="/compLevel.png" alt="Completed" className="w-16 h-16" />
                ) : (
                    <span className="text-white text-xl MontserratBold">&lt;/&gt;</span>
                )}
            </div>
            {/* Всплывашка */}
            {showTooltip && (
                <div className="absolute bottom-[-470%] left-1/2 -translate-x-1/2 w-72 p-6 rounded-3xl shadow-xl z-20 bg-gradient-to-b from-[#8278F6] to-[#C7C4E9] text-white">
                    <h3 className="text-xl font-Montserrat mb-4 min-h-[56px] text-center break-words MontserratBold">
                        {level.title}
                    </h3>

                    <div className="flex justify-between text-center text-black bg-white rounded-xl py-2 px-3 mb-4">
                        <div>
                            <p className="text-xs flex items-center justify-center gap-1">
                                <img src="/Clock.png" alt="Completed" className="w-6 h-6 MonstReg" /> Время
                            </p>
                            <p className="text-lg MontserratBold">{level.time_spent ?? 0}</p>
                        </div>
                        <div>
                            <p className="text-xs flex items-center justify-center gap-1">
                                <img src="/Fire.png" alt="Completed" className="w-6 h-6 MonstReg" /> Баллы
                            </p>
                            <p className="text-lg MontserratBold">{level.xp_earned ?? 0}</p>
                        </div>
                        <div>
                            <p className="text-xs flex items-center justify-center gap-1 MonstReg">
                                <img src="/Cancel.png" alt="Completed" className="w-6 h-6" /> Ошибки
                            </p>
                            <p className="text-lg MontserratBold">{level.mistakes ?? 0}</p>
                        </div>
                    </div>

                    <button className="w-full bg-white text-[#8278F6] MontserratBold py-2 rounded-full mb-2 hover:brightness-95">
                        Изучить теорию
                    </button>
                    {isCompleted ? (
                        <p> </p>
                    ) : (
                        <button
                            disabled={!isUnlocked}
                            className={`w-full bg-white text-[#8278F6] MontserratBold py-2 rounded-full hover:brightness-95 transition ${!isUnlocked ? "opacity-50 cursor-not-allowed" : ""}`}
                            onClick={async () => {
                                if (!isUnlocked) return;
                                try {
                                    await API.post(`/courses/level/${level.id}/start`);
                                    navigate(`/courses/level/${level.id}`);
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