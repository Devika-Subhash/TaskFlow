import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  editTask,
  deleteTask,
  toggleComplete,
}) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h3>📋 No tasks found</h3>
        <p>Add a task to get started!</p>
      </div>
    );
  }

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