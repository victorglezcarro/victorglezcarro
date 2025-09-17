import "./ProjectCard.css";
import { ReactNode } from "react";
import { FiExternalLink } from "react-icons/fi";

interface ProjectData { title: string; description: ReactNode; imgUrl: string; link: string; }

function ProjectCard({ project }: { project: ProjectData }) {

    return (
        <div className="project-card" >
            <img src={project.imgUrl} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <button className="link" onClick={() => window.open(project.link, "_blank")}> <span>Ver Proyecto</span> <FiExternalLink /></button>
        </div>
    );
}

export default ProjectCard;