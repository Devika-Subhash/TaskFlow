import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (task.trim() === "") return;

    if (editIndex !== null) {
      const updatedTasks = tasks.map((item, index) =>
        index === editIndex
          ? { ...item, text: task }
          : item
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

  function clearCompleted() {
    setTasks(
      tasks.filter((item) => !item.completed)
    );
  }

  const filteredTasks = tasks.filter((item) => {
    const matchesSearch = item.text
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !item.completed) ||
      (filter === "completed" && item.completed);

    return matchesSearch && matchesFilter;
  });

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (item) => item.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  return (
    <div>
      <Navbar title="TaskFlow" />
<div className="page-header">
      <h2>Today's Tasks</h2>
<p>Stay organized and get things done.</p>
</div>
      <input
        type="text"
        placeholder="Search tasks"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div>
        <button onClick={() => setFilter("all")}>
          All
        </button>

        <button onClick={() => setFilter("active")}>
          Active
        </button>

        <button onClick={() => setFilter("completed")}>
          Completed
        </button>
      </div>

      <TaskForm
        task={task}
        setTask={setTask}
        addTask={addTask}
        editIndex={editIndex}
      />

      <div>
        <p>Total: {totalTasks}</p>
        <p>Completed: {completedTasks}</p>
        <p>Pending: {pendingTasks}</p>
      </div>

      <TaskList
        tasks={filteredTasks}
        editTask={editTask}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
      />

      <button onClick={clearCompleted}>
        Clear Completed
      </button>
    </div>
  );
}

export default App;