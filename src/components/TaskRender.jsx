import InputTask from "./tasks/InputTask";
import ChoiceOneTask from "./tasks/ChoiceOneTask";
import ChoiceManyTask from "./tasks/ChoiceManyTask";

const TaskRenderer = ({ task, onComplete }) => {
  switch (task.Type) {
    case "input":
      return <InputTask task={task} onComplete={onComplete} />;
    case "choice_one":
      return <ChoiceOneTask task={task} onComplete={onComplete} />;
    case "choice_many":
      return <ChoiceManyTask task={task} onComplete={onComplete} />;
    default:
      return <p>Неизвестный тип: {task.type}</p>;
  }
};

export default TaskRenderer;
