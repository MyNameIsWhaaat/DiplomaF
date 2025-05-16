import { useState } from "react";
import API from "../../API/index";

const InputTask = ({ task, onComplete }) => {
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);

  const submit = async () => {
    const res = await API.post("/submit_answer", {
      task_id: task.ID,
      answer: answer,
    });
    
    setResult(res.data.is_correct ? "✅ Верно!" : "❌ Неверно");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="mb-4 font-semibold">{task.Question}</p>
      <input
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="border p-2 w-full rounded mb-4"
      />
      <button
        onClick={submit}
        className="bg-[#8278F6] text-white px-4 py-2 rounded-xl"
      >
        Ответить
      </button>
      {result && (
        <div className="mt-4">
          <p>{result}</p>
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

export default InputTask;
