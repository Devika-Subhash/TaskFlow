function TaskItem({
  item,
  index,
  editTask,
  deleteTask,
  toggleComplete,
}) {
  return (
    <li className={item.completed ? "task completed" : "task"}>
      <span className="task-text">{item.text}</span>

      <div className="task-actions">
        <button
          className="edit-btn"
          onClick={() => editTask(index)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteTask(index)}
        >
          Delete
        </button>

        <button
          className="complete-btn"
          onClick={() => toggleComplete(index)}
        >
          {item.completed ? "Undo" : "Complete"}
        </button>
      </div>
    </li>
  );
}

export default TaskItem;