import type { ReactNode } from 'react';
import type { Project } from '../../data/portfolio';
import TopClubsArt from './TopClubsArt';
import RedeiaArt from './RedeiaArt';
import EnaireArt from './EnaireArt';
import SharingArt from './SharingArt';
import ElephantArt from './ElephantArt';
import './ProjectArtwork.css';

const artworks: Record<string, ReactNode> = {
  topclubs: <TopClubsArt />,
  redeia: <RedeiaArt />,
  enaire: <EnaireArt />,
  sharing: <SharingArt />,
  elephant: <ElephantArt />,
};

export default function ProjectArtwork({ project, className }: { project: Project; className?: string }) {
  const classes = className ? `project-art art-${project.id} ${className}` : `project-art art-${project.id}`;
  return <div className={classes} role="img" aria-label={project.imageAlt}>{artworks[project.id]}</div>;
}
