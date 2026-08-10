import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  editTask,
  deleteTask,
  toggleComplete,
}) {
  return (
    <ul>
      {tasks.map((item, index) => (
        <TaskItem
          key={index}
          item={item}
          index={index}
          editTask={editTask}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
        />
      ))}
    </ul>
  );
}

export default TaskList;