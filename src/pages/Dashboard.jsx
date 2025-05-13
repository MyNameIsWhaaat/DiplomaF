import CourseModal from "../components/CourseModal";
import CourseCard from "../components/CourseCard";
import { useDashboardData } from "../hooks/useDashboardData";
import "../pages/pages.css"

const Dashboard = () => {


    const {
        coursesWithProgress,
        coursesWithoutProgress,
        selectedCourse,
        setSelectedCourse,
        user,
        handleStartCourse,
    } = useDashboardData();

    return (
        <>
            <div className="flex min-h-screen w-full">
                {/* Левая панель */}
                <aside className="fixed top-0 left-0 h-screen w-1/4 bg-gradient-to-b from-[#C7C4E9] to-[#8278F6] text-white flex flex-col items-center justify-center z-10">
                    <div className="flex flex-col items-center">
                        <img src="avatar.png" alt="avatar" className="w-60 rounded-full mb-4" />
                        <h2 className="text-2xl mb-1 MontserratBold">{user?.username || "..."}</h2>
                        <p className="text-lg MonstReg">Уровень <span className="font-bold MontserratBold">{user?.profile_level || "..."}</span></p>
                        <p className=" text-1xl mt-4 MonstReg">Общее количество очков</p>
                        <p className="text-lg font-bold MontserratBold">{user?.total_xp || "..."}</p>
                    </div>
                    <button
                        onClick={() => window.location.href = "/profile"}
                        className="bg-white text-[#8278F6] mt-4 px-4 py-2 rounded-full font-semibold hover:brightness-95 transition"
                    >
                        Профиль
                    </button>
                    {/* Футер — прижат вниз */}
                    <div className="absolute bottom-4 text-xs text-white/80 flex flex-col gap-1 items-center">
                        <div className="flex">
                            <div>
                            </div>
                            <p className="mt-2">© Katyfaz, 2025</p>
                        </div>
                    </div>

                </aside>
                {/* Правая панель */}
                <main className="ml-[25%] w-[75%] max-h-screen overflow-y-auto p-10 bg-gray-50">
                    <div className="flex flex-row items-center justify-between mb-8">
                        <h1 className="text-3xl MontserratBold text-[#8278F6]">
                            Продолжим изучение!
                        </h1>
                        <button
                            onClick={() => window.location.href = "/courses/1/levels"}
                            className="bg-[#8278F6] text-white MontserratBold px-4 py-2 rounded-xl hover:bg-[#6f66e0] transition"
                        >
                            Панель управления курсами
                        </button>
                    </div>
                    <div className="bg-gradient-to-b from-[#C7C4E9] to-[#8278F6] rounded-3xl p-6 mb-10">
                        <div className="flex gap-6 flex-wrap">
                            {coursesWithProgress.map((course) => (
                                <CourseCard
                                    key={course.id}
                                    title={course.title}
                                    subtitle={course.short_description}
                                    imageUrl={course.image_url}
                                    xpEarned={course.xp_earned} 
                                    xpReward={course.xp_reward}          
                                    onClick={() => console.log("Открыть курс", course.id)}
                                    hasProgress={true}
                                />
                            ))}
                        </div>
                    </div>
                    {/* Курсы без прогресса */}
                    <div className="bg-gradient-to-b from-[#8278F6] to-[#C7C4E9] rounded-3xl p-6 mb-10">
                        <h2 className="text-3xl MontserratBold text-[white] mb-8">
                            Время посмотреть что-то новое!
                        </h2>
                        <div className="flex gap-6 flex-wrap">
                            {coursesWithoutProgress.map((course) => (
                                <CourseCard
                                    key={course.id}
                                    title={course.title}
                                    subtitle={course.short_description}
                                    imageUrl={course.image_url}
                                    onClick={() => setSelectedCourse(course)}
                                    hasProgress={false}
                                />
                            ))}
                        </div>
                    </div>
                </main>
            </div>

            <CourseModal
                course={selectedCourse}
                onClose={() => setSelectedCourse(null)}
                onStart={handleStartCourse}
            />
        </>
    );

};


export default Dashboard;
