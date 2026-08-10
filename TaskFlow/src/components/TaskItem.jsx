function TaskItem({
  item,
  index,
  editTask,
  deleteTask,
  toggleComplete,
}) {
  return (
    <li>
      <span
        style={{
          textDecoration: item.completed
            ? "line-through"
            : "none",
        }}
      >
        {item.text}
      </span>

      <button onClick={() => editTask(index)}>
        Edit
      </button>

      <button onClick={() => deleteTask(index)}>
        Delete
      </button>

      <button onClick={() => toggleComplete(index)}>
        {item.completed ? "Undo" : "Complete"}
      </button>
    </li>
  );
}

export default TaskItem;