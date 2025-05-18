import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import API from "../../API";

const CodeTask = ({ task, onComplete }) => {
  const [code, setCode] = useState(task.default_code || "");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await API.post("/code/submit", {
        task_id: task.ID,
        user_code: code,
      });

      setResult(res.data);
    } catch (err) {
      console.error("Ошибка запроса:", err);
      alert(err.response?.data?.error || "Ошибка отправки");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow w-full max-w-3xl mx-auto">
      <p className="mb-4 font-semibold text-lg">{task.Question}</p>

      <div className="mb-4 border rounded overflow-hidden">
        <CodeMirror
          value={code}
          height="300px"
          extensions={[python()]}
          onChange={(value) => setCode(value)}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-[#8278F6] text-white px-4 py-2 rounded-xl hover:bg-[#6e65e0] transition disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Проверка..." : "Отправить"}
      </button>

      {result && (
        <div className="mt-4 text-center">
          <p
            className={`font-bold text-lg ${
              result.is_correct ? "text-green-600" : "text-red-500"
            }`}
          >
            {result.is_correct ? "✅ Верно!" : "❌ Ошибка"}
          </p>
          <p className="text-sm mt-1">
            Пройдено тестов: {result.passed} из {result.total}
          </p>
          {onComplete && (
            <button
              onClick={onComplete}
              className="text-[#8278F6] underline text-sm mt-2"
            >
              Далее
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeTask;