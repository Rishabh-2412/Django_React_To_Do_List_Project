import TaskItem from "./TaskItem";

function TaskList({ tasks, deleteTask, toggleComplete }) {

    return (
        <div>
            {tasks.map((task, index) => (
                <TaskItem
                    key={index}
                    task={task}
                    index={index}
                    deleteTask={deleteTask}
                    toggleComplete={toggleComplete}
                />
            ))}
        </div>
    );
}

export default TaskList;