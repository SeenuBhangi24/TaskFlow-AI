import "./TaskCard.css";

function TaskCard({

    task,

    onEdit,

    onDelete,

    onStatusChange,

}) {

    return (

        <div className="task-card">

            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>

                <strong>Status:</strong>

            </p>

            <select

                value={task.status}

                onChange={(event) =>
                    onStatusChange(task, event.target.value)
                }

            >

                <option value="To Do">

                    To Do

                </option>

                <option value="In Progress">

                    In Progress

                </option>

                <option value="Done">

                    Done

                </option>

            </select>

            <p>

                <strong>Priority:</strong> {task.priority}

            </p>

            <p>

                <strong>Due Date:</strong>{" "}

                {

                    task.dueDate

                        ? new Date(task.dueDate).toLocaleDateString()

                        : "No Due Date"

                }

            </p>

            <div className="task-buttons">

                <button
                    className="edit-btn"
                    onClick={() => onEdit(task)}
                >

                    Edit

                </button>

                <button
                    className="delete-btn"
                    onClick={() => onDelete(task._id)}
                >

                    Delete

                </button>

            </div>

        </div>

    );

}

export default TaskCard;