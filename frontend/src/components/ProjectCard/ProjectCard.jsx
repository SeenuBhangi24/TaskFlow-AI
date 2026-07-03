import "./ProjectCard.css";

function ProjectCard({ project, onEdit, onDelete }) {

    return (

        <div className="project-card">

            <h2>{project.title}</h2>

            <p>{project.description}</p>

            <div className="project-buttons">

                {/* Edit Button */}
                <button
                    className="edit-btn"
                    onClick={() => onEdit(project)}
                >
                    Edit
                </button>

                {/* Delete Button */}
                <button
                    className="delete-btn"
                    onClick={() => onDelete(project._id)}
                >
                    Delete
                </button>

            </div>

        </div>

    );

}

export default ProjectCard;