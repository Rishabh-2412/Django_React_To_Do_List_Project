import { useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {

    const [tasks, setTasks] = useState([
        {
            title: "Learn React",
            completed: false
        },
        {
            title: "Learn Django",
            completed: true
        },
        {
            title: "Learn DRF",
            completed: false
        }
    ]);

    const addTask = (newTask) => {
        setTasks([...tasks,
            {
                title: newTask,
                completed: false
            }
        ]);
    };

    const deleteTask = (indexToDelete) => {
        setTasks(
            tasks.filter((task, index) => index !== indexToDelete)
        );
    };

    const toggleComplete = (indexToToggle) => {
        setTasks(
            tasks.map((task, index) =>
                index === indexToToggle
                    ? {
                        ...task,
                        completed: !task.completed
                    }
                    : task
            )
        );
    };

    return (
        <div className="App">
            <h1>My To-Do List</h1>
            <TaskForm addTask={addTask}/>
            <TaskList tasks={tasks} deleteTask={deleteTask} toggleComplete={toggleComplete}/>
        </div>
    );
}

export default App;