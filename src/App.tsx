import { Component, lazy, Suspense, useState, type ReactNode } from 'react';
import { motion, MotionConfig } from 'motion/react';
import { FiArrowDown, FiArrowDownRight, FiArrowUp, FiArrowUpRight, FiBox, FiCode, FiDownload, FiGithub, FiGlobe, FiLayers, FiLinkedin, FiMapPin, FiPause, FiPlay, FiPlus, FiTerminal } from 'react-icons/fi';
import Navigation from './components/Navigation/Navigation';
import ContactForm from './components/ContactForm/ContactForm';
import ProjectDialog from './components/ProjectDialog/ProjectDialog';
import ProjectArtwork from './components/ProjectArtwork/ProjectArtwork';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { education, experience, languages, profile, projects, technologyGroups, type Project } from './data/portfolio';
import portrait from './assets/profile.jpg';
import './App.css';

const HeroScene = lazy(() => import('./components/HeroScene/HeroScene'));
const stack = ['Angular', 'TypeScript', 'RxJS', 'NestJS', 'Spring Boot', 'PostgreSQL', 'Docker', 'Azure'];
const filterOptions = ['Todos', 'Profesionales', 'Personal'] as const;
type Filter = typeof filterOptions[number];

function SceneFallback() {
  return <div className="scene-fallback" aria-hidden="true"><div /><div /><div /></div>;
}
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <SceneFallback /> : this.props.children; }
}
function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = usePrefersReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return <div className="section-label"><span>{number} /</span><span>{children}</span></div>;
}
function App() {
  const [paused, setPaused] = useState(false);
  const [filter, setFilter] = useState<Filter>('Todos');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const visibleProjects = projects.filter(project => filter === 'Todos' || (filter === 'Personal' ? project.id === 'topclubs' : project.id !== 'topclubs'));

  return <MotionConfig reducedMotion={reducedMotion ? 'always' : 'never'}><div className={paused ? 'portfolio animations-paused' : 'portfolio'}>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <Navigation />
    <main id="contenido" tabIndex={-1}>
      <section className="hero container" id="inicio" aria-labelledby="hero-title">
        <div className="hero-topline"><span className="eyebrow"><i className="status-dot" />{profile.role} <span className="hero-location">— SEVILLA, ES</span></span><span className="hero-edition">PORTFOLIO / 2026</span></div>
        <div className="hero-main">
          <div className="hero-copy">
            <p className="hero-name">Hola, soy Víctor González Carro.</p>
            <h1 id="hero-title">Frontend.<br />Con otra<br /><span>perspectiva.</span></h1>
            <p className="hero-description">{profile.intro}</p>
            <div className="hero-actions"><a className="button button-primary" href="#proyectos">Explora mi trabajo <FiArrowDownRight size={20} /></a><a className="cv-link" href={profile.cv} download>Descargar CV <FiDownload size={16} /></a></div>
          </div>
          <div className="hero-visual" role="group" aria-label="Escultura 3D interactiva de un nudo metálico en órbita">
            <div className="visual-cross cross-tl">+</div><div className="visual-cross cross-br">+</div>
            <div className="visual-label"><span>EXPLORACIÓN 001</span><span>CODE IN ORBIT</span></div>
            <div className="scene-glow" />
            <SceneBoundary><Suspense fallback={<SceneFallback />}><HeroScene paused={paused || !!reducedMotion} /></Suspense></SceneBoundary>
            <div className="visual-bottom"><span><i className="tiny-dot" /> {reducedMotion ? 'UNA PERSPECTIVA DIFERENTE' : paused ? 'ÓRBITA EN PAUSA' : 'MUEVE EL CURSOR Y EXPLORA'}</span>{!reducedMotion && <button className="scene-control" onClick={() => setPaused(!paused)} aria-label={paused ? 'Reanudar animación' : 'Pausar animación'} aria-pressed={paused}>{paused ? <FiPlay size={14} /> : <FiPause size={14} />}</button>}</div>
          </div>
        </div>
        <div className="hero-bottom"><span>ESPECIALIZADO EN ANGULAR.<br /><strong>CURIOSO POR NATURALEZA.</strong></span><a href="#proyectos" className="scroll-link">Sigue explorando <span><FiArrowDown size={18} /></span></a><div className="hero-socials"><a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub de Víctor (nueva pestaña)"><FiGithub size={19} /></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de Víctor (nueva pestaña)"><FiLinkedin size={19} /></a></div></div>
      </section>

      <div className="stack-strip" aria-label="Tecnologías principales"><div className="container stack-track">{stack.map(tech => <span key={tech}><span className="stack-star" aria-hidden="true">✳</span>{tech}</span>)}</div></div>

      <section id="proyectos" className="section container" aria-labelledby="projects-title">
        <Reveal><SectionLabel number="01">PROYECTOS SELECCIONADOS</SectionLabel><div className="section-heading"><h2 id="projects-title">Del código<br />al mundo real<span className="accent">.</span></h2><p>Productos propios, infraestructuras críticas<br className="desktop-break" /> y nuevas formas de conectar ideas.</p></div></Reveal>
        <div className="project-toolbar"><div className="project-filters" aria-label="Filtrar proyectos">{filterOptions.map(option => <button key={option} aria-pressed={filter === option} onClick={() => setFilter(option)}>{option}{option === 'Todos' && <span>{String(projects.length).padStart(2, '0')}</span>}</button>)}</div><span className="project-count" aria-live="polite">{String(visibleProjects.length).padStart(2, '0')} proyectos</span></div>
        <div className="project-grid">{visibleProjects.map(project => <Reveal key={project.id} className="project-card"><button className="project-open" onClick={() => setSelectedProject(project)} aria-label={`Ver proyecto ${project.title}`}><ProjectArtwork project={project} /><span className="project-open-icon"><FiArrowUpRight size={23} /></span></button><div className="project-meta"><span>{project.category}</span><span>{project.period}</span></div><div className="project-title-row"><h3><button onClick={() => setSelectedProject(project)}>{project.title}</button></h3><FiArrowUpRight aria-hidden="true" /></div><p className="project-summary">{project.summary}</p><div className="tags">{project.technologies.slice(0, 3).map(tech => <span key={tech}>{tech}</span>)}</div></Reveal>)}</div>
        <a className="text-link github-more" href={profile.github} target="_blank" rel="noopener noreferrer">Más código e ideas en GitHub <FiArrowUpRight /></a>
      </section>

      <section id="experiencia" className="experience-section section" aria-labelledby="experience-title"><div className="container experience-layout"><Reveal className="experience-intro"><SectionLabel number="02">EL RECORRIDO</SectionLabel><h2 id="experience-title">Cada reto,<br />una nueva<br /><span className="muted-heading">perspectiva.</span></h2><p>De una startup en Dublín a sistemas de navegación aérea. Aprender, construir y seguir avanzando.</p><a href={profile.cv} download className="text-link">Mi trayectoria en PDF <FiDownload size={16} /></a><div className="experience-stamp"><span>3+</span><p>AÑOS CONVIRTIENDO<br />IDEAS EN SOFTWARE</p></div></Reveal><div className="timeline">{experience.map((job, index) => <Reveal key={job.id}><details className="experience-item" open={index === 0 ? true : undefined}><summary><span className={`timeline-dot${index === 0 ? ' current' : ''}`} /><div className="job-summary"><div className="job-date">{job.period}{index === 0 && <span>AHORA</span>}</div><h3>{job.company}{job.client && <span> / {job.client}</span>}</h3><p>{job.role}</p></div><FiPlus className="expand-icon" size={20} /></summary><div className="job-detail">{job.note && <p className="job-note">{job.note}</p>}<p>{job.description}</p><ul>{job.highlights.map(item => <li key={item}>{item}</li>)}</ul><div className="tags">{job.technologies.map(tech => <span key={tech}>{tech}</span>)}</div></div></details></Reveal>)}</div></div></section>

      <section id="sobre-mi" className="section container" aria-labelledby="about-title"><Reveal><SectionLabel number="03">MÁS ALLÁ DEL CÓDIGO</SectionLabel></Reveal><div className="about-layout"><Reveal className="portrait-wrap"><img src={portrait} alt="Víctor González Carro al aire libre" width={1000} height={1000} loading="lazy" decoding="async" /><div className="portrait-caption"><span><FiMapPin size={14} /> Sevilla, España</span><span>Siempre aprendiendo ↗</span></div><div className="portrait-star" aria-hidden="true">✳</div></Reveal><Reveal className="about-copy"><h2 id="about-title">La curiosidad<br />es mi punto<br /><span className="accent">de partida.</span></h2>{profile.bio.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<div className="language-list">{languages.map(language => <span key={language.name}><FiGlobe size={15} /><strong>{language.name}</strong>{language.level}</span>)}</div></Reveal></div>
        <Reveal className="toolbox"><div className="subsection-heading"><h3>Mi caja de herramientas<span className="accent">.</span></h3><span>LAS PIEZAS DETRÁS DE CADA PROYECTO</span></div><div className="skills-grid">{technologyGroups.map((group, index) => <article className="skill-group" key={group.id}><div className="skill-icon">{index === 0 ? <FiCode /> : index === 1 ? <FiLayers /> : <FiBox />}</div><h4>{group.title}</h4><p>{group.description}</p><div className="tags">{group.technologies.map(tech => <span key={tech}>{tech}</span>)}</div></article>)}</div></Reveal>
        <Reveal className="education"><div className="subsection-heading"><h3>Seguir aprendiendo<span className="accent">.</span><span className="sr-only"> Formación</span></h3><span>FORMACIÓN</span></div><div className="education-list">{education.map(item => <a key={item.id} className="education-row" href={item.href} target="_blank" rel="noopener noreferrer"><span className="education-period">{item.period}</span><div><h4>{item.title}</h4><p>{item.institution}</p></div><span className={item.ongoing ? 'education-state ongoing' : 'education-state'}>{item.ongoing ? 'En curso' : 'Completado'}</span><FiArrowUpRight aria-hidden="true" size={21} /></a>)}</div></Reveal>
      </section>

      <section id="contacto" className="contact-section section" aria-labelledby="contact-title"><div className="container"><Reveal><SectionLabel number="04">LA PRÓXIMA IDEA</SectionLabel></Reveal><div className="contact-layout"><Reveal className="contact-copy"><h2 id="contact-title">Todo empieza<br />con un <span>hola<svg viewBox="0 0 180 15" aria-hidden="true"><path d="M3 10 Q80 -2 177 7" /></svg></span><span className="accent">.</span></h2><p>¿Tienes un proyecto en mente, una oportunidad<br className="desktop-break" /> o simplemente algo que compartir?<br />Me encantará leerte.</p><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<FiArrowUpRight /></a><div className="contact-socials"><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <FiArrowUpRight /></a><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub <FiArrowUpRight /></a></div><FiArrowDownRight className="contact-arrow" aria-hidden="true" /></Reveal><Reveal className="contact-form-column"><ContactForm /></Reveal></div></div></section>
    </main>
    <footer className="footer container"><div className="footer-top"><a href="#inicio" className="wordmark" aria-label="Volver al inicio">vgc<span>✳</span></a><p>Hecho con intención. Y unas cuantas líneas de código.</p><a className="back-top" href="#inicio">Volver arriba <FiArrowUp /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {profile.name}</span><span><FiTerminal size={13} /> DISEÑADO PARA SEGUIR EVOLUCIONANDO</span></div></footer>
    <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
  </div></MotionConfig>;
}
export default App;
