import ProjectCard from "../../components/ProjectCard/ProjectCard";
import VariableProximity from "../../TextAnimations/VariableProximity/VariableProximity";
import "./Projects.css";
import { ReactNode, useRef } from "react";

interface ProjectData { title: string; description: ReactNode; imgUrl: string; link: string; }

const projects: ProjectData[] = [
    {
        title: "Enaire",
        description: (
            <>
                Aplicación de gestión interna desarrollada para la entidad encargada del espacio aéreo en España. El proyecto se centró en una migración tecnológica a versiones modernas, mejorando seguridad y escalabilidad. Se utilizó Java + Spring en el backend, Angular 17+ en el frontend, con Oracle SQL para la base de datos y Figma en el diseño, siguiendo metodología Agile para garantizar entregas iterativas de valor.
            </>
        ),
        imgUrl: "/assets/Enaire.png",
        link: "https://www.enaire.es/home"
    },
    {
        title: "Sharing App", description: (
            <>
                Start-up orientada a universidades de EE. UU. que lanzó un marketplace sostenible para que los estudiantes pudieran vender o alquilar productos de sus habitaciones entre compañeros, reduciendo la producción y, con ello, la contaminación. La aplicación principal se construyó en low-code, mientras que la plataforma de administración se desarrolló en Angular 17+, aportando flexibilidad y escalabilidad a la gestión.
            </>
        ), imgUrl: "/assets/SharingGroup.png",
        link: "https://www.linkedin.com/company/sharing-llc/about/"
    },
    {
        title: "The Elephant Hive", description: (
            <>
                Proyecto creado para una empresa irlandesa con el objetivo de ayudar a los estudiantes en la generación de resúmenes y currículums mediante IA (ChatGPT). La solución se implementó como una extensión de Google Chrome, que realizaba web scraping con Python + BeautifulSoup, enviaba la información al backend y un script en JavaScript procesaba los datos, mostrando al usuario una ventana emergente con el contenido resumido de la página.
            </>
        ), imgUrl: "/assets/TheElephantHive.png",
        link: "https://www.theelephanthive.com/"
    },
];

function Projects({ sectionId }: { sectionId: string }) {
    const containerRef = useRef(null);

    return (
        <section id={sectionId} className="projects-content" ref={containerRef}>
            <VariableProximity
                label={'Proyectos'}
                className={'variable-proximity-projects'}
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={containerRef}
                radius={100}
                falloff='gaussian'
            />
            <div className="projects-grid">
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                ))}
            </div>
        </section>
    );
}

export default Projects;