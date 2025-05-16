import CourseModal from "../components/CourseModal";
import CourseCard from "../components/CourseCard";
import { useDashboardData } from "../hooks/useDashboardData";
import "../pages/pages.css"
import WelcomeModal from "../components/WelcomeModal";

const Dashboard = () => {


    const {
        coursesWithProgress,
        coursesWithoutProgress,
        selectedCourse,
        setSelectedCourse,
        user,
        handleStartCourse,
        isNewUser,
        dismissWelcome,
    } = useDashboardData();

    return (
        <>
            <div className=" flex min-h-screen w-full ">
                {/* Левая панель */}
                <aside className="fixed top-0 left-0 h-screen w-1/4 min-w-[260px] bg-gradient-to-b from-[#8278F6] to-[#8278F6] text-white flex flex-col justify-between p-6 z-10 shadow-lg">

                    {/* Верхняя часть — Профиль */}
                    <div className="flex flex-col items-center text-center">
                        <div className="relative mb-6">
                            <img
                                src="avatar.png"
                                alt="avatar"
                                className="w-44 h-44 object-cover rounded-full border-4 border-white shadow-lg"
                            />
                            {/* Индикатор онлайн */}
                            <span className="absolute bottom-3 right-3 w-5 h-5 bg-green-400 border-2 border-white rounded-full"></span>
                        </div>

                        <h2 className="text-2xl font-extrabold MontserratBold mb-2">{user?.username || "..."}</h2>
                        <p className="text-lg MonstReg">Уровень: <span className="font-bold text-xl">{user?.profile_level || "..."}</span></p>

                        {/* Карточка XP */}
                        <div className="w-full mt-6 p-5 bg-white/20 rounded-xl shadow-inner backdrop-blur-sm">
                            <p className="text-base MonstReg mb-2">Общее количество очков</p>
                            <p className="text-3xl font-extrabold MontserratBold">{user?.total_xp || 0}</p>
                        </div>

                        {/* Кнопка */}
                        <button
                            onClick={() => window.location.href = "/profile"}
                            className="mt-8 bg-white text-[#8278F6] px-6 py-3 rounded-full text-lg font-bold hover:scale-105 hover:shadow-lg transition-transform duration-200"
                        >
                            Профиль
                        </button>
                    </div>

                    {/* Нижняя часть — Футер */}
                    <div className="text-sm text-white/70 text-center border-t border-white/30 pt-4">
                        <p>© Katyfaz, 2025</p>
                    </div>
                </aside>
                {/* Правая панель */}
                <main className="ml-[25%] w-[75%] max-h-screen overflow-y-auto p-10 bg-[url('/dashBack.png')] bg-cover bg-center">
                    <div className="flex flex-row items-center justify-between mb-8">
                        <h1 className="text-3xl MontserratBold text-[#8278F6]">
                            Продолжим изучение!
                        </h1>
                        <button
                            onClick={() => window.location.href = "/courses/1/levels"}
                            className="bg-[#8278F6] text-2xl text-white MontserratBold px-4 py-2 rounded-xl hover:bg-[#6f66e0] transition"
                        >
                            Панель управления курсами
                        </button>
                    </div>
                    <div className="bg-gradient-to-b from-[#C7C4E9] to-[#8278F6] rounded-3xl p-6 mb-15 ">
                        {coursesWithProgress.length === 0 ? (
                            <div className="flex flex-col items-center justify-center w-full py-12 ">
                                <img
                                    src="https://66.media.tumblr.com/fb13686d4e89bf7347ef07bbfbc527d2/tumblr_mu6g5naKzL1s8hnhko1_500.gif"
                                    alt="Empty state"
                                    className="w-94  object-contain mb-6"
                                />
                                <p className="text-white text-2xl MontserratBold text-center">
                                    Пока что здесь пусто!<br />Но в твоих силах это изменить 💪
                                </p>
                            </div>
                        ) : (
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
                        )}
                    </div>
                    {/* Курсы без прогресса */}
                    <div className="bg-gradient-to-b from-[#8278F6] to-[#C7C4E9] rounded-3xl p-15 ">
                        <h2 className="text-3xl MontserratBold text-[white] mb-8 ">
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
                {isNewUser && (
                    <WelcomeModal onClose={dismissWelcome} />
                )}
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
