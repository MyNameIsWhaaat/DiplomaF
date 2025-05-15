// components/SuccessModal.jsx
import React from "react";

const SuccessRegModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-xl text-center">
        <h2 className="text-3xl font-bold text-[#8278F6] mb-2">Поздравляем!</h2>
        <img
          src="https://64.media.tumblr.com/tumblr_m6k3ksvUaF1qecngho1_500.gif"
          alt="Success"
          className="w-54 mx-auto mb-4"
        />
        
        <p className="text-gray-700 mb-1">{message}</p>
        <p className="text-gray-700 mb-6">Скорее заходи и отправляйся в незабываемое путешествие</p>
        <button
          onClick={onClose}
          className="bg-[#8278F6] text-white px-6 py-2 rounded-md w-full hover:bg-[#6f68e0] transition font-semibold"
        >
          Продолжить
        </button>
      </div>
    </div>
  );
};

export default SuccessRegModal;
