import TaskItem from "./TaskItem";
import { motion, AnimatePresence } from "framer-motion";

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
                <AnimatePresence>
                    {tasks.map((task) => (
                        <motion.div
                            key={task.id}
                            layout
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{ duration: 0.25 }}
                        >
                            <TaskItem
                                task={task}
                                deleteTask={deleteTask}
                                toggleComplete={toggleComplete}
                                editTask={editTask}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            }
        </div>
    );
}

export default TaskList;