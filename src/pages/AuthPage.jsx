import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../API/auth";

const AuthPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
          const response = await signIn({ username, password });
          const token = response.data.token;
      
          localStorage.setItem("token", token);
          navigate("/dashboard");
        } catch (err) {
          alert("Ошибка входа: " + (err.response?.data?.message || err.message));
        }
    };
    
    return (
        <div className="flex min-h-screen w-full overflow-hidden">
            {/* Левая панель */}
            <div className="w-2/5 bg-gradient-to-b from-[#C7C4E9] to-[#8278F6] flex items-end justify-center relative overflow-visible">
                <img
                    src="/TranshumansAstro.png"
                    alt="Astronaut"
                    className="absolute left-1/3 -translate-x-1/6 w-[140%] max-w-none"
                />
            </div>
            {/* Правая панель 
            /TranshumansAstro.png*/}
            <div className="w-3/5 bg-white flex items-center justify-center">
                <img
                    src="/KATYFAZ.png" // замени на свой путь
                    alt="Right Decoration"
                    className="absolute right-0 bottom-0 w-[500px] max-w-none z-0"
                />
                <div className="w-full max-w-md px-6 z-10">
                    <h2 className="text-5xl font-extrabold mb-8 text-center">Авторизация</h2>

                    <input
                        type="text"
                        placeholder="Имя"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full mb-4 p-3 border-3 border-[#8278F6]   rounded-md focus:outline-none focus:ring-2 focus:ring-[#8278F6]"
                    />

                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mb-4 p-3 border-3 border-[#8278F6]  rounded-md focus:outline-none focus:ring-2 focus:ring-[#8278F6]"
                    />

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            Запомнить меня
                        </label>
                        <Link to="/register" className=" text-2xl  text-[#8278F6] hover:underline">
                            Регистрация
                        </Link>
                    </div>

                    <button 
                    onClick={handleLogin}
                    className="w-full bg-[#8278F6] hover:bg-[#6f68e0] text-2xl  text-white font-extrabold py-2 rounded-md">
                        Войти
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AuthPage;