import TaskItem from "./TaskItem";

function TaskList({ tasks, deleteTask, toggleComplete, editTask }) {

    return (
        <div>
            {
                tasks.length === 0 ?
                (
                    <div className="text-center text-muted mt-5">
                        <h1>📝</h1>
                        <h4>No tasks yet</h4>
                        <p>Add your first task above.</p>
                    </div>
                )
                :
                (
                    tasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            deleteTask={deleteTask}
                            toggleComplete={toggleComplete}
                            editTask={editTask}
                        />
                    ))
                )
            }
        </div>
    );
}

export default TaskList;