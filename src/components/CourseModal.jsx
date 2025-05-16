import React from "react";
import API from "../API";
import "../pages/pages.css"; 

const CourseModal = ({ course, onClose, onStart }) => {
  if (!course) return null;

  const handleStartCourse = async () => {
    try {
      await API.post(`/courses/start/${course.id}`);
      onStart(course.id);
    } catch (error) {
      console.error("Ошибка запуска курса:", error);
      alert("Не удалось начать курс. Попробуйте позже.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center animate-fade-in">
      <div className="backdrop-blur-xl bg-white/40 border border-white/60 rounded-xl p-8 w-full max-w-lg shadow-xl relative text-black">
        <button
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
        >
          ✕
        </button>

         <img
          src="https://media.giphy.com/media/L8K62iTDkzGX6/giphy.gif"
          alt="Welcome"
          className="w-64 mx-auto mb-6"
        />

        <h2 className="text-2xl font-bold text-center mb-4 text-[#8278F6]">{course.title}</h2>

        <p className="text-base text-center mb-6">{course.FullDescription}</p>

        <div className="flex justify-center">
          <button
            onClick={handleStartCourse}
            className="bg-[#8278F6] hover:bg-[#6f68e0] w-full text-white font-semibold px-6 py-2 rounded-md transition"
          >
            🚀 Начать курс
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseModal;
