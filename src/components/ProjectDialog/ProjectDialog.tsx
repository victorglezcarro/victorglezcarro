import { useEffect, useRef } from 'react';
import { FiArrowUpRight, FiX } from 'react-icons/fi';
import { type Project, experience } from '../../data/portfolio';
import ProjectArtwork from '../ProjectArtwork/ProjectArtwork';

export default function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    if (project && element && !element.open) element.showModal();
    if (!project && element?.open) element.close();
  }, [project]);
  const job = project?.experienceId ? experience.find(item => item.id === project.experienceId) : undefined;
  return <dialog ref={dialog} className="project-dialog" onClose={onClose} onClick={event => {
    if (event.target === event.currentTarget) {
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
    }
  }} aria-labelledby="project-dialog-title">
    {project && <>
      <div className="dialog-topline"><span className="eyebrow">{project.category}</span><button onClick={onClose} className="icon-button" aria-label="Cerrar proyecto" autoFocus><FiX size={22} /></button></div>
      <ProjectArtwork project={project} className="dialog-art" />
      <p className="dialog-period">{project.period}</p>
      <h2 id="project-dialog-title">{project.title}<span>.</span></h2>
      <p className="dialog-summary">{project.summary}</p>
      <p className="dialog-description">{project.description}</p>
      {job && <div className="dialog-contribution"><h3>Mi contribución</h3><ul>{job.highlights.map(item => <li key={item}>{item}</li>)}</ul></div>}
      <div className="tags">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div>
      <div className="dialog-actions">{project.href ? <a className="button button-primary" href={project.href} target="_blank" rel="noopener noreferrer">{project.linkLabel} <FiArrowUpRight /></a> : <a className="button button-primary" href="#contacto" onClick={onClose}>Hablemos del proyecto <FiArrowUpRight /></a>}</div>
    </>}
  </dialog>;
}
