import { useState } from "react";

function TaskItem({ task, index, deleteTask, toggleComplete, editTask }) {

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);

    const handleSave = () => {
        if (editedTitle.trim() === "") return;
        editTask(index, editedTitle);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedTitle(task.title);
        setIsEditing(false);
    };

    return (
        <div>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(index)}
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
                        style={{
                            textDecoration: task.completed
                                ? "line-through"
                                : "none"
                        }}
                    >
                        {task.title}
                    </span>
                )
            }

            {isEditing ?
                (
                    <>
                        <button onClick={handleSave}> Save </button>
                        <button onClick={handleCancel}> Cancel </button>
                    </>
                )
                : (
                    <button onClick={() => setIsEditing(true)} > Edit </button>
                )
            }

            <button onClick={() => deleteTask(task.id)} >Delete</button>
        </div>
    );
}

export default TaskItem;