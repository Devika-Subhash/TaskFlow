import { useState } from "react";
import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  function addTask() {
    if (task.trim() === "") return;

    if (editIndex !== null) {
      const updatedTasks = tasks.map((item, index) =>
        index === editIndex ? { ...item, text: task } : item
      );

      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([
        ...tasks,
        {
          text: task,
          completed: false,
        },
      ]);
    }

    setTask("");
  }

  function deleteTask(indexToDelete) {
    setTasks(
      tasks.filter((_, index) => index !== indexToDelete)
    );
  }

  function editTask(index) {
    setTask(tasks[index].text);
    setEditIndex(index);
  }

  function toggleComplete(index) {
    setTasks(
      tasks.map((item, i) =>
        i === index
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }

  return (
    <div>
      <Navbar title="TaskFlow" />

      <TaskForm
        task={task}
        setTask={setTask}
        addTask={addTask}
        editIndex={editIndex}
      />

      <TaskList
        tasks={tasks}
        editTask={editTask}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
      />
    </div>
  );
}

export default App;