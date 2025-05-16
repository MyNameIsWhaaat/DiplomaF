import { useState, useEffect } from "react";
import API from "../../API/index";

const ChoiceManyTask = ({ task, onComplete }) => {
  const [variants, setVariants] = useState([]);
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    API.get(`/tasks/${task.id}/variants`).then((res) => setVariants(res.data));
  }, [task.id]);

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const submit = async () => {
    const res = await API.post("/submit", {
      task_id: task.id,
      answer: selected,
    });
    setResult(res.data.is_correct ? "✅ Верно!" : "❌ Неверно");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="mb-4 font-semibold">{task.question}</p>
      <div className="flex flex-col gap-2 mb-4">
        {variants.map((v) => (
          <label
            key={v.id}
            className={`border p-2 rounded cursor-pointer ${
              selected.includes(v.id) ? "bg-[#C7C4E9]" : "bg-white"
            }`}
          >
            <input
              type="checkbox"
              value={v.id}
              checked={selected.includes(v.id)}
              onChange={() => toggle(v.id)}
              className="mr-2"
            />
            {v.content}
          </label>
        ))}
      </div>
      <button
        onClick={submit}
        className="bg-[#8278F6] text-white px-4 py-2 rounded-xl"
        disabled={selected.length === 0}
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

export default ChoiceManyTask;
