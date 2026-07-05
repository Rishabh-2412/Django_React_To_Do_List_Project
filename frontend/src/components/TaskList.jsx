import TaskItem from "./TaskItem";

function TaskList({ tasks }) {

    return (
        <div>
            {tasks.map((task, index) => (
                <TaskItem
                    key={index}
                    task={task}
                />
            ))}
        </div>
    );
}

export default TaskList;