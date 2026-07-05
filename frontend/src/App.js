import { useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {

    const [tasks, setTasks] = useState([]);
    const addTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    return (
        <div className="App">
            <h1>My To-Do List</h1>
            <TaskForm addTask={addTask}/>
            <TaskList tasks={tasks} />
        </div>
    );
}

export default App;