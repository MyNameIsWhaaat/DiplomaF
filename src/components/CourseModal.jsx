import React from "react";
import API from "../API";

const CourseModal = ({ course, onClose, onStart }) => {
  if (!course) return null;

  const handleStartCourse = async () => {
    try {
      await API.post(`/courses/start/${course.id}`);
      onStart(course.id); // вызывает, например, редирект
    } catch (error) {
      console.error("Ошибка запуска курса:", error);
      alert("Не удалось начать курс. Попробуйте позже.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 w-full max-w-lg shadow-lg relative">
        <button
          className="absolute top-3 right-4 text-gray-400 hover:text-black text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        <img
          src={course.image_url || "/CourseIcon.png"}
          alt="Course"
          className="w-40 mx-auto mb-4"
        />

        <h2 className="text-2xl font-bold text-center mb-2">{course.title}</h2>
        <p className="text-sm text-gray-600 text-center mb-6">{course.FullDescription}</p>

        <div className="flex justify-center">
          <button
            onClick={handleStartCourse}
            className="bg-[#8278F6] hover:bg-[#6f68e0] text-white font-semibold px-6 py-2 rounded-md"
          >
            Начать курс
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseModal;
