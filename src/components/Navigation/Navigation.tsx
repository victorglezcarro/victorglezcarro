import { useEffect, useRef, useState } from 'react';
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi';
import { sections, useActiveSection } from '../../hooks/useActiveSection';

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
    };
    const onClick = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    const media = window.matchMedia('(min-width: 901px)');
    const onResize = () => { if (media.matches) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onClick);
    media.addEventListener('change', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onClick);
      media.removeEventListener('change', onResize);
    };
  }, [open]);
  return <header className="site-header" ref={header}>
    <a className="wordmark" href="#inicio" aria-label="Víctor González Carro, inicio" onClick={() => setOpen(false)}>vgc<span>✳</span></a>
    <button className="menu-toggle" ref={toggle} onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-nav" aria-label={open ? 'Cerrar menú' : 'Abrir menú'}>
      {open ? <FiX size={23} /> : <FiMenu size={23} />}
    </button>
    <nav id="main-nav" aria-label="Navegación principal" className={open ? 'main-nav is-open' : 'main-nav'}>
      {sections.map(({ id, label }) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>{label}</a>)}
      <a className="nav-contact" href="#contacto" onClick={() => setOpen(false)}>Hablemos <FiArrowUpRight /></a>
    </nav>
    <a className="header-contact" href="#contacto">Hablemos <FiArrowUpRight /></a>
  </header>;
}
