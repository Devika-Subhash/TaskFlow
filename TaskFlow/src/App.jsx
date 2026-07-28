import { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function addTask() {
    if (task.trim() === "") return;

    setTasks([...tasks, task]);
    setTask("");
  }

  function deleteTask(indexToDelete) {
  const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
  setTasks(updatedTasks);
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

      <button onClick={addTask}>Add Task</button>

      <ul>
  {tasks.map((item, index) => (
    <li key={index}>
      {item}
      <button onClick={() => deleteTask(index)}>Delete</button>
    </li>
  ))}
</ul>
    </div>
  );
}

export default App;