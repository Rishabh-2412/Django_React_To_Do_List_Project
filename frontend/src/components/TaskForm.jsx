import { useState, useRef } from "react";

function TaskForm({ addTask , loading}) {
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
                        disabled={!task.trim() || loading}>
                            {
                                loading ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                            aria-hidden="true"
                                        ></span>
                                        Adding...
                                    </>
                                ) : ( "Add" ) }</button>
            </div>
        </form>

    );

}

export default TaskForm;