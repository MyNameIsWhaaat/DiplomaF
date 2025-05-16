import React, { useEffect, useState } from "react";
import API from "../../API";
import {
  DndContext,
  closestCenter,
  useDroppable,
  useDraggable
} from "@dnd-kit/core";

const DraggableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab"
  };
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="p-2 bg-indigo-100 rounded shadow">
      {children}
    </div>
  );
};

const DropZone = ({ id, children, isOver, correct }) => {
  const { setNodeRef } = useDroppable({ id });
  const borderColor = correct == null ? (isOver ? "border-indigo-500 bg-indigo-50" : "border-gray-300") : correct ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50";
  return (
    <div
      ref={setNodeRef}
      className={`min-h-[48px] border-2 p-2 rounded transition-all border-dashed ${borderColor}`}
    >
      {children}
    </div>
  );
};

const MatchTask = ({ task, onComplete }) => {
  const [pairs, setPairs] = useState([]);
  const [shuffledRight, setShuffledRight] = useState([]);
  const [userMatches, setUserMatches] = useState({});
  const [activeId, setActiveId] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    API.get(`/tasks/${task.ID}/match-pairs`).then((res) => {
      setPairs(res.data);
      const shuffled = [...res.data].sort(() => Math.random() - 0.5);
      setShuffledRight(shuffled.map((p) => p.right_text));
    });
  }, [task.ID]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && over.id.startsWith("drop:")) {
      const leftText = over.id.split(":")[1];
      setUserMatches((prev) => ({ ...prev, [leftText]: active.id }));
    }
    setActiveId(null);
  };

  const handleSubmit = async () => {
    const answer = Object.entries(userMatches).map(
      ([left, right]) => `${left}:${right}`
    );
    const res = await API.post("/submit_answer", {
      task_id: task.ID,
      answer,
    });
    setIsCorrect(res.data.is_correct);
    setSubmitted(true);
  };

  const getCorrectness = (leftText) => {
    const correct = pairs.find(p => p.left_text === leftText)?.right_text;
    const user = userMatches[leftText];
    if (!user) return null;
    return user === correct;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">{task.Question}</h2>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragStart={({ active }) => setActiveId(active.id)}>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            {pairs.map((pair) => (
              <div key={pair.left_text} className="flex flex-col">
                <span className="mb-1 font-medium">{pair.left_text}</span>
                <DropZone id={`drop:${pair.left_text}`} isOver={activeId && userMatches[pair.left_text] === activeId} correct={submitted ? getCorrectness(pair.left_text) : null}>
                  {userMatches[pair.left_text] && (
                    <div className="flex items-center gap-2">
                      <DraggableItem id={userMatches[pair.left_text]}>
                        {userMatches[pair.left_text]}
                      </DraggableItem>
                      {submitted && (
                        <span className="text-lg">
                          {getCorrectness(pair.left_text) ? "✅" : "❌"}
                        </span>
                      )}
                    </div>
                  )}
                </DropZone>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {shuffledRight
              .filter((text) => !Object.values(userMatches).includes(text))
              .map((text) => (
                <DraggableItem key={text} id={text}>{text}</DraggableItem>
              ))}
          </div>
        </div>
      </DndContext>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="mt-6 bg-[#8278F6] text-white px-6 py-2 rounded-xl font-semibold disabled:opacity-50"
          disabled={Object.keys(userMatches).length !== pairs.length}
        >
          Проверить
        </button>
      ) : (
        <div className="mt-6 text-center">
  <img
    src={
      isCorrect
        ? "https://app-231578.games.s3.yandex.net/231578/ne1adv40rirtah33fsinxqyljdy7les0/dansingCat.gif"
        : "https://steamuserimages-a.akamaihd.net/ugc/937185783117354991/D20CF9DB8D7C7D2AF074ADF23A74ACB1278740C7/"
    }
    alt="Feedback GIF"
    className="w-48 h-48 mx-auto object-contain mb-2"
  />
  <p className={`font-bold text-lg ${isCorrect ? "text-green-600" : "text-red-500"}`}>
    {isCorrect ? "✅ Все пары верны!" : "❌ Некоторые пары неверны"}
  </p>
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

export default MatchTask;