import { useState, useRef } from "react";

function TaskForm({ addTask }) {
    const [task, setTask] = useState("");
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(task.trim()==="") return;
        addTask(task);
        setTask("");
        inputRef.current.focus();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <input
                    ref={inputRef}
                    type="text"
                    value={task}
                    placeholder="Enter a new task..."
                    onChange={(e)=>setTask(e.target.value)}
                    className="form-control"
                />
                <button type="submit" 
                        className="btn btn-primary"
                        disabled={!task.trim()}> Add </button>
            </div>
        </form>

    );

}

export default TaskForm;