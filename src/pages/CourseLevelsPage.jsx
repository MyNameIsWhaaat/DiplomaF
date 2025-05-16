import LevelNode from "../components/LevelNode";
import { useCourseLevels } from "../hooks/useCourseLevels";
import "../pages/pages.css"

const CourseLevelsPage = () => {

    const { courses, selectedCourseId, setSelectedCourseId, levels } = useCourseLevels();

    return (

        <div className="flex w-full h-screen">
            {/* Левая панель */}
            <aside className="w-1/4 min-w-[240px] bg-gradient-to-b from-[#8278F6] to-[#C7C4E9] text-white p-6 flex flex-col items-center shadow-lg rounded-tr-2xl rounded-br-2xl">
                <h2 className="text-3xl font-bold mb-4 MontserratBold tracking-wide">Мои курсы</h2>

                <div className="w-full flex flex-col gap-2 mb-6">
                    {courses.map((course) => (
                        <button
                            key={course.id}
                            onClick={() => setSelectedCourseId(course.id)}
                            className={`w-full py-2 px-4 rounded-lg text-3xl font-semibold text-center MontserratBold transition-all duration-200
          ${course.id === selectedCourseId
                                    ? "bg-white text-[#8278F6] shadow-md"
                                    : "bg-white/10 hover:bg-white/20"
                                }`}
                        >
                            {course.title}
                        </button>
                    ))}
                </div>

                <div className="w-full mt-auto">
                    <button
                        onClick={() => window.location.href = "/dashboard"}
                        className="w-full bg-white text-[#8278F6] text-3xl font-bold py-2 rounded-lg hover:bg-[#f3f2ff] transition border border-white/40 shadow-sm"
                    >
                        Главная страница
                    </button>
                </div>
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
