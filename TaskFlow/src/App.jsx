import Navbar from "./components/Navbar"


function App() {
  return (
    <div>
    <Navbar title="TaskFlow"/>
    <h2>Today's Tasks</h2>
    <input type="text" placeholder="Enter a task"/>
    <button>Add Task</button>
    </div>
  );
}

export default App;