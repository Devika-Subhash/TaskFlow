import { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  function addTask() {
  if (task.trim() === "") return;

  if (editIndex !== null) {
    const updatedTasks = [...tasks];
    updatedTasks[editIndex] = task;

    setTasks(updatedTasks);
    setEditIndex(null);
  } else {
    setTasks([...tasks, task]);
  }

  setTask("");
}

  function deleteTask(indexToDelete) {
  const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
  setTasks(updatedTasks);
}

  function editTask(index) {
  setTask(tasks[index]);
  setEditIndex(index);
}

  return (
    <div>
      <Navbar title="TaskFlow" />

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

      <ul>
  {tasks.map((item, index) => (
    <li key={index}>
      {item}
      <button onClick={() => deleteTask(index)}>Delete</button>
      <button onClick={() => editTask(index)}>Edit </button>
    </li>
  ))}
</ul>
    </div>
  );
}

export default App;