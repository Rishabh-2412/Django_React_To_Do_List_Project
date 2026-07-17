import { useEffect, useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import api from "./services/api";
import Stats from "./components/Stats";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [sortBy, setSortBy] = useState("newest");

    const openDeleteModal = (task) => {
        setTaskToDelete(task);
        setShowDeleteModal(true);
    };
    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setTaskToDelete(null);
    };
    const confirmDelete = async () => {
        if (!taskToDelete) return;
        await deleteTask(taskToDelete.id);
        closeDeleteModal();
    };

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
        setLoading(true);
        try {
            try {
                const response = await api.post("tasks/", {
                    title: newTask,
                    completed: false
                });
                setTasks((previousTasks) => [...previousTasks, response.data]);
                toast.success("Task added successfully!");
            }
            catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
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
            toast.success("Task deleted successfully!");
        }
        catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
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
            toast.error("Something went wrong!");
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
            toast.success("Task updated successfully!");
        }
        catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        }
    };

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        task => task.completed
    ).length;

    const pendingTasks = totalTasks - completedTasks;

    const filteredTasks = tasks.filter((task) => {
        const matchesSearch =
            task.title.toLowerCase().includes(searchTerm.toLowerCase());
        if (!matchesSearch)
            return false;
        if (filter === "active")
            return !task.completed;
        if (filter === "completed")
            return task.completed;
        return true;
    });

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        switch (sortBy) {
            case "alphabet":
                return a.title.localeCompare(b.title);
            case "oldest":
                return a.id - b.id;
            case "newest":
                return b.id - a.id;
            case "completed":
                return Number(b.completed) - Number(a.completed);
            case "pending":
                return Number(a.completed) - Number(b.completed);
            default:
                return 0;
        }
    });

    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow-lg">
                            <div className="card-body">
                                <h1 className="text-center mb-4">My To-Do List</h1>

                                <Stats
                                    totalTasks={totalTasks}
                                    completedTasks={completedTasks}
                                    pendingTasks={pendingTasks}
                                />

                                <TaskForm addTask={addTask} loading={loading} />
                                <input
                                    type="text"
                                    className="form-control my-3"
                                    placeholder="🔍 Search tasks..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />

                                <div className="btn-group mb-3">
                                    <button
                                        className={`btn ${filter === "all" ? "btn-primary" : "btn-outline-primary"}`}
                                        onClick={() => setFilter("all")}
                                    > All </button>
                                    <button
                                        className={`btn ${filter === "active" ? "btn-primary" : "btn-outline-primary"}`}
                                        onClick={() => setFilter("active")}
                                    > Active </button>
                                    <button
                                        className={`btn ${filter === "completed" ? "btn-primary" : "btn-outline-primary"}`}
                                        onClick={() => setFilter("completed")}
                                    > Completed </button>
                                </div>

                                <div className="mb-3">
                                    <select
                                        className="form-select"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <option value="newest">Newest First</option>
                                        <option value="oldest">Oldest First</option>
                                        <option value="alphabet">Alphabetical (A-Z)</option>
                                        <option value="completed">Completed First</option>
                                        <option value="pending">Pending First</option>
                                    </select>
                                </div>

                                <TaskList tasks={sortedTasks}
                                    deleteTask={openDeleteModal}
                                    toggleComplete={toggleComplete}
                                    editTask={editTask}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                theme="colored"
            />
            <div
                className={`modal fade ${showDeleteModal ? "show d-block" : ""}`}
                tabIndex="-1"
                style={{
                    backgroundColor: "rgba(0,0,0,0.5)"
                }}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                Delete Task
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={closeDeleteModal}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p>
                                Are you sure you want to delete
                                <strong>
                                    {" "}
                                    {taskToDelete?.title}
                                    {" "}
                                </strong>
                                ?
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn-secondary"
                                onClick={closeDeleteModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={confirmDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;