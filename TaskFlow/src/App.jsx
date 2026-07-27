import { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [task, setTask] = useState("");

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

      <button>Add Task</button>
    </div>
  );
}

export default App;