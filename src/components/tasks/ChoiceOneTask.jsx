import { useState, useEffect } from "react";
import API from "../../API/index";

const ChoiceOneTask = ({ task, onComplete }) => {
  const [variants, setVariants] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    API.get(`/tasks/${task.ID}/variants`).then((res) => setVariants(res.data));
  }, [task.id]);

  const submit = async () => {
    const res = await API.post("/submit_answer", {
      task_id: task.ID,
      answer: selected,
    });
    setResult(res.data.is_correct ? "✅ Верно!" : "❌ Неверно");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="mb-4 font-semibold">{task.Question}</p>
      <div className="flex flex-col gap-2 mb-4">
        {variants.map((v) => (
          <label
            key={v.ID}
            className={`border p-2 rounded cursor-pointer ${
              selected === v.ID ? "bg-[#C7C4E9]" : "bg-white"
            }`}
          >
            <input
              type="radio"
              value={v.ID}
              checked={selected === v.ID}
              onChange={() => setSelected(v.ID)}
              className="mr-2"
            />
            {v.Content}
          </label>
        ))}
      </div>
      <button
        onClick={submit}
        className="bg-[#8278F6] text-white px-4 py-2 rounded-xl"
        disabled={selected === null}
      >
        Ответить
      </button>
      {result && (
        <div className="mt-4">
          <p>{result}</p>
          <button onClick={onComplete} className="text-sm underline mt-2 text-[#8278F6]">
            Далее
          </button>
        </div>
      )}
    </div>
  );
};

export default ChoiceOneTask;
