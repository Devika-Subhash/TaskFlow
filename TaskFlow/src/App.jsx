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
  const [darkMode, setDarkMode] = useState(false);

  // Save tasks to Local Storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add or update task
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

  // Delete task
  function deleteTask(indexToDelete) {
    setTasks(
      tasks.filter((_, index) => index !== indexToDelete)
    );
  }

  // Edit task
  function editTask(index) {
    setTask(tasks[index].text);
    setEditIndex(index);
  }

  // Complete / Undo task
  function toggleComplete(index) {
    setTasks(
      tasks.map((item, i) =>
        i === index
          ? {
              ...item,
              completed: !item.completed,
            }
          : item
      )
    );
  }

  // Clear completed tasks
  function clearCompleted() {
    setTasks(
      tasks.filter((item) => !item.completed)
    );
  }

  // Search + Filter
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

  // Statistics
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (item) => item.completed
  ).length;

  const pendingTasks =
    totalTasks - completedTasks;

  // Progress
  const progress =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Navbar title="TaskFlow" />

      <main>
        <div className="page-header">
          <h2>Today's Tasks</h2>
          <p>Stay organized and get things done.</p>
        </div>

        {/* Dark Mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode
            ? "☀️ Light Mode"
            : "🌙 Dark Mode"}
        </button>

        {/* Search */}
        <input
          type="text"
          placeholder="Search tasks"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {/* Filters */}
        <div>
          <button
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            onClick={() => setFilter("active")}
          >
            Active
          </button>

          <button
            onClick={() =>
              setFilter("completed")
            }
          >
            Completed
          </button>
        </div>

        {/* Task Form */}
        <TaskForm
          task={task}
          setTask={setTask}
          addTask={addTask}
          editIndex={editIndex}
        />

        {/* Statistics */}
        <div className="stats">
          <p>Total: {totalTasks}</p>
          <p>
            Completed: {completedTasks}
          </p>
          <p>Pending: {pendingTasks}</p>
        </div>

        {/* Progress */}
        <div className="progress-section">
          <div className="progress-info">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Task List */}
        <TaskList
          tasks={filteredTasks}
          editTask={editTask}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
        />

        {/* Clear Completed */}
        <button onClick={clearCompleted}>
          Clear Completed
        </button>
      </main>
    </div>
  );
}

export default App;