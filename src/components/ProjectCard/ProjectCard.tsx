import "./ProjectCard.css";
import useAosInView from "../../hooks/useAosInView";
import { ReactNode } from "react";
import { FiExternalLink } from "react-icons/fi";

interface ProjectCardProps { index: number; title: string; description: ReactNode; imgUrl: string; link: string; }

function ProjectCard({ index, title, description, imgUrl, link }: ProjectCardProps) {
    const cardRef = useAosInView<HTMLDivElement>({ threshold: 0.15, once: true });

    return (
        <div ref={cardRef} className="project-card" data-aos="flip-left" data-aos-delay={(index + 1) * 250} >
            <img src={imgUrl} alt={title} />
            <h3>{title}</h3>
            <p>{description}</p>
            <button className="link" onClick={() => window.open(link, "_blank")}> <span>Ver Proyecto</span> <FiExternalLink /></button>
        </div>
    );
}

export default ProjectCard;