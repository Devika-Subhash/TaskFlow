function TaskForm({ task, setTask, addTask, editIndex }) {
  return (
    <div>
      <h2>Today's Tasks</h2>

      <input
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={addTask}>
        {editIndex !== null ? "Update Task" : "Add Task"}
      </button>
    </div>
  );
}

export default TaskForm;