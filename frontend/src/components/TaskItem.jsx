function TaskItem({ task, index, deleteTask, toggleComplete }) {
    return (
        <div>
            <input 
                type="checkbox" 
                checked={task.completed}
                onChange={() => toggleComplete(index)}
            />
            <span
                style={{
                    textDecoration: task.completed
                        ? "line-through"
                        : "none"
                }}
            >
                {task.title}
            </span>
            <button>Edit</button>
            <button onClick={() => deleteTask(index)} >Delete</button>
        </div>
    );
}

export default TaskItem;