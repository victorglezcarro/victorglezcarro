import { useEffect, useState } from 'react';

export const sections = [
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'contacto', label: 'Contacto' },
];

export function useActiveSection() {
  const [active, setActive] = useState('inicio');
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = 'inicio';
      for (const { id } of sections) {
        if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= 180) current = id;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) current = 'contacto';
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return active;
}
