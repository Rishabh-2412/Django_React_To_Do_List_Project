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

    return (
        <div className="card shadow-sm mb-3 border-0 task-card">
            <div className="card-body d-flex justify-content-between align-items-center">
                <div className="form-check d-flex align-items-center">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task)}
                />
                {isEditing ?
                    (
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                        />
                    )
                    : (
                        <span 
                            className={`ms-2 ${
                                task.completed
                                    ? "text-success text-decoration-line-through"
                                    : ""
                            }`}
                        >
                            {task.title}
                        </span>
                    )
                }
                </div>
                <div className="d-flex gap-2">
                {isEditing ?
                    (
                        <>
                            <button onClick={handleSave}
                                    className="btn btn-outline-success btn-sm"> <i className="bi bi-check-lg"></i> </button>
                            <button onClick={handleCancel}
                                    className="btn btn-outline-secondary btn-sm"> <i className="bi bi-x-lg"></i> </button>
                        </>
                    )
                    : (
                        <button onClick={() => setIsEditing(true)} 
                                className="btn btn-outline-warning btn-sm"> <i className="bi bi-pencil"></i> </button>
                    )
                }

                <button onClick={() => deleteTask(task)} 
                        className="btn btn-outline-danger btn-sm"> <i className="bi bi-trash"></i> </button>
                </div>
            </div>
        </div>
    );
}

export default TaskItem;