import LevelNode from "../components/LevelNode";
import { useCourseLevels } from "../hooks/useCourseLevels";
import "../pages/pages.css"

const CourseLevelsPage = () => {
    
    const { courses, selectedCourseId, setSelectedCourseId, levels } = useCourseLevels();

    return (
        
        <div className="flex w-full h-screen">
            {/* Левая панель */}
            <aside className="w-1/4 bg-gradient-to-b from-[#8278F6] to-[#C7C4E9] text-white p-8 flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-6 MontserratBold">Мои курсы</h2>
                {courses.map((course) => (
                    <button
                        key={course.id}
                        onClick={() => setSelectedCourseId(course.id)}
                        className={`mb-3 py-2 px-4 rounded-md w-full text-sm font-bold text-center transition-all duration-200 MontserratBold ${course.id === selectedCourseId
                            ? "bg-white text-[#8278F6]"
                            : "bg-[#ffffff33] hover:bg-white/20"
                            }`}
                    >
                        {course.title}
                    </button>
                ))}
                <button
                            onClick={() => window.location.href = "/dashboard"}
                            className="bg-[#8278F6] text-white MontserratBold px-4 py-2 w-full rounded-md hover:bg-[#6f66e0] transition"
                        >
                            Главная страница
                        </button>
            </aside>

            {/* Правая часть */}
            <main className="w-3/4 relative bg-gray-50 overflow-hidden flex items-center justify-center">
                <h1 className="absolute text-[160px] text-[#cccccc] font-black opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
                    АЛГОРИТМЫ
                </h1>

                {levels.length > 0 ? (
                    <div className="relative flex items-center gap-44 z-10">
                        {levels.map((level, index) => (
                            <LevelNode
                                key={level.id}
                                level={level}
                                index={index}
                                isLast={index === levels.length - 1}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400 text-xl">Выберите курс, чтобы увидеть уровни</p>
                )}
            </main>
        </div>
    );
};

export default CourseLevelsPage;
