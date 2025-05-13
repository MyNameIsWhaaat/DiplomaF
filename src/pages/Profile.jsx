import React from "react";

const Profile = ({ user }) => {
  if (!user) return <p className="text-center mt-20 text-gray-500">Загрузка профиля...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#C7C4E9] to-[#8278F6] p-10 flex flex-col items-center">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-xl w-full text-center">
        <img
          src="/avatar.png"
          alt="Аватар"
          className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-[#8278F6]"
        />
        <h1 className="text-3xl font-bold text-[#8278F6] mb-2">{user.username}</h1> 

        <div className="bg-gray-100 rounded-xl p-4 text-left space-y-2">
          <p><strong>Имя:</strong> {user.name}</p>
          <p><strong>Уровень:</strong> {user.profile_level}</p>
          <p><strong>Опыт:</strong> {user.total_xp} XP</p>
          <p><strong>Email:</strong> {user.email || "не указан"}</p>
        </div>

        <button className="mt-6 bg-[#8278F6] text-white px-6 py-2 rounded-full hover:bg-[#6f66e0] transition">
          Редактировать профиль
        </button>
      </div>
    </div>
  );
};

export default Profile;
