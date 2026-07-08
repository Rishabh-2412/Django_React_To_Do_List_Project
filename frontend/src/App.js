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
            catch(error){
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
        catch(error){
            console.log(error);
        }
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

    const editTask = (indexToEdit, newTitle) => {
        setTasks(
            tasks.map((task, index) =>
                index === indexToEdit
                    ? {
                        ...task,
                        title: newTitle
                    }
                    : task
            )
        );
    };

    return (
        <div className="App">
            <h1>My To-Do List</h1>
            <TaskForm addTask={addTask}/>
            <TaskList tasks={tasks} 
                deleteTask={deleteTask} 
                toggleComplete={toggleComplete} 
                editTask={editTask}
            />
        </div>
    );
}

export default App;