import { useEffect, useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import api from "./services/api";

function App() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.get("tasks/");
                setTasks(response.data);
            }
            catch (error) {
                console.log(error);
            }
        };
        fetchTasks();
    }, []);

    const addTask = async (newTask) => {
        try {
            const response = await api.post("tasks/", {
                title: newTask,
                completed: false
            });
            setTasks((previousTasks) => [...previousTasks, response.data]);
        }
        catch (error) {
            console.log(error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await api.delete(`tasks/${taskId}/`);
            setTasks((previousTasks) =>
                previousTasks.filter(
                    (task) => task.id !== taskId
                )
            );
        }
        catch (error) {
            console.log(error);
        }
    };

    const toggleComplete = async (task) => {
        try {
            const response = await api.patch(`tasks/${task.id}/`,
                {
                    completed: !task.completed
                }
            );
            setTasks((previousTasks) =>
                previousTasks.map((t) => t.id === task.id ? response.data : t)
            );
        }
        catch (error) {
            console.log(error);
        }
    };

    const editTask = async (taskId, newTitle) => {
        try {
            const response = await api.patch(`tasks/${taskId}/`,
                {
                    title: newTitle
                }
            );
            setTasks((previousTasks) =>
                previousTasks.map((task) => task.id === taskId ? response.data : task)
            );
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="App">
            <h1>My To-Do List</h1>
            <TaskForm addTask={addTask} />
            <TaskList tasks={tasks}
                deleteTask={deleteTask}
                toggleComplete={toggleComplete}
                editTask={editTask}
            />
        </div>
    );
}

export default App;