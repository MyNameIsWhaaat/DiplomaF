// components/TheoryModal.jsx
import React, { useEffect, useState } from "react";
import { getTheoryByLevel } from "../API/theory"; // не забудь создать этот API
import "../pages/pages.css";
import "../pages/pages.css";

const TheoryModal = ({ levelId, onClose }) => {
  const [blocks, setBlocks] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchTheory = async () => {
      try {
        const res = await getTheoryByLevel(levelId);
        setBlocks(res.data || []); 
      } catch (err) {
        console.error("Ошибка загрузки теории:", err);
      }
    };

    fetchTheory();
  }, [levelId]);

  if (!blocks.length) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeInScale">
        <div className="bg-white rounded-xl p-6 max-w-xl w-full text-center">
          <p className="text-lg">Загрузка теории...</p>
          <button onClick={onClose} className="mt-4 text-[#8278F6] underline">Закрыть</button>
        </div>
      </div>
    );
  }

return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-3xl p-8 relative animate-fadeInScale">
        <button
          className="absolute top-4 right-6 text-gray-600 text-2xl hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-3xl MontserratBold text-[#8278F6] mb-6 text-center">Теория</h2>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          {blocks.map((block) => (
            <div key={block.id}>
              <h3 className="text-xl MontserratBold text-[#8278F6] mb-2">{block.title}</h3>
              <div
                className="text-gray-800 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: block.content }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TheoryModal;
