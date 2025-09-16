import "./ProjectCard.css";
import useAosInView from "../../hooks/useAosInView";
import { ReactNode } from "react";
import { FiExternalLink } from "react-icons/fi";

interface ProjectData { title: string; description: ReactNode; imgUrl: string; link: string; }

function ProjectCard({ index, project }: { index: number; project: ProjectData }) {
    const cardRef = useAosInView<HTMLDivElement>({ threshold: 0.15, once: true });

    return (
        <div ref={cardRef} className="project-card" data-aos="flip-left" data-aos-delay={(index + 1) * 250} >
            <img src={project.imgUrl} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <button className="link" onClick={() => window.open(project.link, "_blank")}> <span>Ver Proyecto</span> <FiExternalLink /></button>
        </div>
    );
}

export default ProjectCard;