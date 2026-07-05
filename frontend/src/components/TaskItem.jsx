function TaskItem(props) {
    return (
        <div>
            <input type="checkbox" />
            <span>{props.task}</span>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    );
}

export default TaskItem;