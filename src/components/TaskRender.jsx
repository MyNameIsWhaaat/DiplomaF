import InputTask from "./tasks/InputTask";
import ChoiceOneTask from "./tasks/ChoiceOneTask";
import ChoiceManyTask from "./tasks/ChoiceManyTask";
import MatchTask from "./tasks/MatchTask";
import CodeTask from "./tasks/CodeTask";

const TaskRenderer = ({ task, onComplete }) => {
  switch (task.Type) {
    case "input":
      return <InputTask task={task} onComplete={onComplete} />;
    case "choice_one":
      return <ChoiceOneTask task={task} onComplete={onComplete} />;
    case "choice_many":
      return <ChoiceManyTask task={task} onComplete={onComplete} />;
    case "match":
      return <MatchTask task={task} onComplete={onComplete} />;
    case "code":
      return <CodeTask task={task} onComplete={onComplete} />;
    default:
      return <p>Неизвестный тип: {task.type}</p>;
  }
};

export default TaskRenderer;
