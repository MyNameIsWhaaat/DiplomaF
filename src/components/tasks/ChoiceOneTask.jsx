import { useState, useEffect } from "react";
import API from "../../API/index";

const ChoiceOneTask = ({ task, onComplete }) => {
  const [variants, setVariants] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    API.get(`/tasks/${task.ID}/variants`).then((res) => setVariants(res.data));
  }, [task.ID]);

  const submit = async () => {
    const res = await API.post("/submit_answer", {
      task_id: task.ID,
      answer: selected,
    });
    setResult(res.data.is_correct ? "✅ Верно!" : "❌ Неверно");
  };

  return (
    <div className="backdrop-blur-md bg-white/60 border border-[#C7C4E9] p-8 rounded-3xl shadow-xl w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-[#8278F6] mb-6 text-center">{task.Question}</h2>

      <div className="flex flex-col gap-4 mb-6">
        {variants.map((v) => (
          <label
            key={v.ID}
            className={`transition-all duration-300 border-2 rounded-xl px-4 py-3 cursor-pointer flex items-center gap-3
              ${selected === v.ID
                ? "border-[#8278F6] bg-[#E9E7FF]"
                : "border-gray-300 bg-white hover:bg-gray-50"
              }`}
          >
            <input
              type="radio"
              value={v.ID}
              checked={selected === v.ID}
              onChange={() => setSelected(v.ID)}
              className="accent-[#8278F6]"
            />
            <span className="text-sm">{v.Content}</span>
          </label>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={submit}
          disabled={selected === null}
          className={`transition bg-[#8278F6] text-white px-6 py-2 rounded-md w-full font-semibold shadow-md hover:bg-[#6f66e0] disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Ответить
        </button>
      </div>

      {result && (
        <div className="mt-2 text-center flex flex-col items-center gap-4">
          <div
            className={`text-2xl font-bold px-6 py-3 rounded-md shadow-lg
        ${result === "✅ Верно!" ? "bg-green-100 text-green-600 w-full" : "bg-red-100 text-red-600"}`}
          >
            {result === "✅ Верно!" ? "🎉 Отлично, всё верно!" : "😬 Упс! Попробуй внимательнее"}
          </div>
          <img
            src={
              result === "✅ Верно!"
                ? "https://app-231578.games.s3.yandex.net/231578/ne1adv40rirtah33fsinxqyljdy7les0/dansingCat.gif" // веселая
                : "https://steamuserimages-a.akamaihd.net/ugc/937185783117354991/D20CF9DB8D7C7D2AF074ADF23A74ACB1278740C7/" // грустная
            }
            alt="Feedback GIF"
            className="w-48 h-48 object-contain"
          />
          

          <button
            onClick={onComplete}
            className="mt-4 bg-[#8278F6] hover:bg-[#6c61f0] w-full text-white px-6 py-2 rounded-md font-semibold transition"
          >
            Продолжить
          </button>
        </div>
      )}
    </div>
  );
};

export default ChoiceOneTask;
