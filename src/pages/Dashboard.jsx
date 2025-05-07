import React, { useEffect, useState } from "react";
import CourseModal from "../components/CourseModal";
import CourseCard from "../components/CourseCard";
import {
    getCoursesWithProgress,
    getCoursesWithoutProgress,
} from "../API/courses";

const Dashboard = () => {
    const [coursesWithProgress, setCoursesWithProgress] = useState([]);
    const [coursesWithoutProgress, setCoursesWithoutProgress] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        fetchCourses();
    }, []);


    const handleStartCourse = async (courseId) => {
        try {
            await API.post(`/courses/${courseId}/start`);
            alert("Курс начат!");
            setSelectedCourse(null); // закрыть модалку
            fetchCourses(); // перезагрузить прогресс
        } catch (err) {
            console.error(err);
            alert("Ошибка при запуске курса");
        }
    };

    const fetchCourses = async () => {
        try {
            const [withProgress, withoutProgress] = await Promise.all([
                getCoursesWithProgress(),
                getCoursesWithoutProgress(),
            ]);
            setCoursesWithProgress(withProgress.data);
            setCoursesWithoutProgress(withoutProgress.data);
        } catch (err) {
            console.error("Ошибка загрузки курсов:", err);
        }
    };

    return (
        <>
            <div className="flex min-h-screen w-full">
                {/* Левая панель */}
                <aside className="fixed top-0 left-0 h-screen w-1/4 bg-gradient-to-b from-[#C7C4E9] to-[#8278F6] text-white flex flex-col items-center justify-center z-10">
                    <div className="flex flex-col items-center">
                        <img src="/avatar.png" alt="avatar" className="w-60 rounded-full mb-4" />
                        <h2 className="text-2xl font-bold mb-1">Katyfaz</h2>
                        <p className="text-lg">Уровень <span className="font-bold">Мастер</span></p>
                        <p className="text-sm mt-4">🕒 Время обучения</p>
                        <p className="text-lg font-bold">205 часов</p>
                    </div>

                    {/* Футер — прижат вниз */}
                    <div className="absolute bottom-4 text-xs text-white/80 flex flex-col gap-1 items-center">
                        <div className="flex">
                            <a href="#" className="underline">Поддержка</a>
                            <a href="#" className="underline">Для бизнеса</a>
                            <a href="#" className="underline">Сотрудничество</a>
                            <div>
                            </div>
                            <p className="mt-2">© Katyfaz, 2025</p>
                        </div>
                    </div>

                </aside>


                {/* Правая панель */}
                <main className="ml-[25%] w-[75%] max-h-screen overflow-y-auto p-10 bg-gray-50">
                    {/* Курсы с прогрессом */}
                    <h1 className="text-3xl font-bold text-[#8278F6] mb-8">
                        Продолжим изучение!
                    </h1>
                    <div className="bg-gradient-to-b from-[#C7C4E9] to-[#8278F6] rounded-3xl p-6 mb-10">
                        <div className="flex gap-6 flex-wrap">
                            {coursesWithProgress.map((course) => (
                                <CourseCard
                                    key={course.id}
                                    title={course.title}
                                    subtitle={`${course.short_description} (${course.xp_earned}/${course.xp_reward} XP)`}
                                    imageUrl={course.image_url}
                                    onClick={() => console.log("Открыть курс", course.id)}
                                    hasProgress={true}
                                />
                            ))}
                        </div>
                    </div>
                    {/* Курсы без прогресса */}

                    <div className="bg-gradient-to-b from-[#8278F6] to-[#C7C4E9] rounded-3xl p-6 mb-10">
                        <h2 className="text-3xl font-bold text-[white] mb-8">
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
