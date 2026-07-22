import { useState } from "react";
import "../components/TaskItem.css"

function TaskItem({ task, index, deleteTask, toggleComplete, editTask }) {

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);

    const handleSave = () => {
        if (editedTitle.trim() === "") return;
        editTask(task.id, editedTitle);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedTitle(task.title);
        setIsEditing(false);
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month, day] = dateStr.split("-");
        return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="card shadow-sm mb-3 border-0 task-card">
            <div className="card-body d-flex justify-content-between align-items-start">
                {/* Left Section */}
                <div className="d-flex flex-grow-1 align-items-start">

                    <input
                        className="form-check-input me-3"
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleComplete(task)}
                    />

                    <div className="ms-3 flex-grow-1">

                        {isEditing ? (

                            <input
                                type="text"
                                className="form-control"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                            />

                        ) : (

                            <h5
                                className={`mb-1 fw-semibold ${
                                    task.completed
                                        ? "text-success text-decoration-line-through"
                                        : ""
                                }`}
                            >
                                {task.title}
                            </h5>

                        )}

                        {task.due_date && (

                            <small className="text-muted d-flex align-items-center">

                                📅&nbsp;Due: {formatDate(task.due_date)}

                            </small>

                        )}

                    </div>

                </div>

                {/* Right Section */}

                <div className="d-flex gap-2 ms-3">

                    {isEditing ? (

                        <>
                            <button
                                onClick={handleSave}
                                className="btn btn-outline-success btn-sm"
                            >
                                <i className="bi bi-check-lg"></i>
                            </button>

                            <button
                                onClick={handleCancel}
                                className="btn btn-outline-secondary btn-sm"
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </>

                    ) : (

                        <button
                            onClick={() => setIsEditing(true)}
                            className="btn btn-outline-warning btn-sm"
                        >
                            <i className="bi bi-pencil"></i>
                        </button>

                    )}

                    <button
                        onClick={() => deleteTask(task)}
                        className="btn btn-outline-danger btn-sm"
                    >
                        <i className="bi bi-trash"></i>
                    </button>

                </div>

            </div>
        </div>
    );
}

export default TaskItem;