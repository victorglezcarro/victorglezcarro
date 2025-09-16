import { useRef } from "react";
import "./About.css";
import VariableProximity from "../../TextAnimations/VariableProximity/VariableProximity";

function About({ sectionId }: { sectionId: string }) {
    const containerRef = useRef(null);
    return (
        <section id={sectionId} ref={containerRef} className="about-content">
            <VariableProximity
                label={'Sobre mí'}
                className={'variable-proximity-projects'}
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={containerRef}
                radius={100}
                falloff='gaussian'
            />
            <div className="about-text">
                <p className="paragraph">
                    Soy <span className="important-word">Víctor González Carro</span>, un
                    <span className="important-word"> Software Engineer Full-Stack </span>
                    apasionado por la tecnología y el desarrollo de
                    <span className="important-word"> soluciones innovadoras</span>.
                    A lo largo de mi experiencia profesional he trabajado en proyectos internacionales y nacionales utilizando
                    <span className="important-word"> Angular (17+)</span>,
                    <span className="important-word"> Spring Boot</span>,
                    <span className="important-word"> Java</span>,
                    <span className="important-word"> TypeScript</span>,
                    <span className="important-word"> SQL</span>,
                    <span className="important-word"> HTML</span>,
                    <span className="important-word"> CSS</span> y
                    <span className="important-word"> JavaScript</span>, además de integrar herramientas de
                    <span className="important-word"> inteligencia artificial</span>,
                    <span className="important-word"> web scraping</span> en
                    <span className="important-word"> Python</span> (Beautiful Soup) y la API de
                    <span className="important-word"> OpenAI</span>.</p>
                <p className="paragraph">
                    Me defino como una persona
                    <span className="important-word"> curiosa</span>,
                    <span className="important-word"> resolutiva</span> y orientada al
                    <span className="important-word"> aprendizaje continuo</span>, con especial interés en el desarrollo de aplicaciones escalables y seguras.
                    Valoro el <span className="important-word"> trabajo en equipo</span> y aplico
                    <span className="important-word"> metodologías ágiles</span>,
                    <span className="important-word"> integración continua</span> y
                    <span className="important-word"> testing automatizado</span> para asegurar la calidad en cada proyecto.
                </p>
                <p className="paragraph">
                    Actualmente, mi objetivo es seguir creciendo como programador, profundizando en
                    <span className="important-word"> ciberseguridad</span> y explorando nuevas tecnologías que me permitan crear soluciones con
                    <span className="important-word"> impacto real</span>.
                </p>
            </div>
        </section>
    );
}

export default About;